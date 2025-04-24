import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { prisma } from 'src/db';
import { GetPostDto } from './dto/get-post.dto';
import { meiliSearchService } from 'src/search-library/meilisearch.service';
import { RedisCacheService } from 'src/cache/cache.service';

@Injectable()
export class PostService {
  private readonly cacheKey = 'posts';
  
  
  constructor(private readonly cache: RedisCacheService) {}
  async create(createPostDto: CreatePostDto) {
    const {title, slug, tags, content, category, thumbnail, authorId} = createPostDto;
   await prisma.post.create({data: {
      title,
      slug,
      tags,
      category,
      thumbnail,
      authorId,
      content: {
        create: content.map((section) => ({
          title: section.title,
          images: section.images,
          description: section.description,
        })),  
      },
    }});

    const post = await prisma.post.findUnique({
      where: {
        slug
      },
      include: {
        author: true,
        content: true,
      }})

    const postDto = GetPostDto.fromEntity(post);
    // add to meilisearch
    await meiliSearchService.addBlogsToMeiliSearch([postDto])
    // add to cache
    await this.cache.addNewValue(this.cacheKey, postDto)

    return {
      message: 'Post created successfully!',
      statusCode: 201,
    }
  }

  async findAll() {
    let postsData = []
    let message = 'Posts retrieved successfully!'
    const postsFromCache = await this.cache.get(this.cacheKey)
    if(postsFromCache !== null){
      postsData = postsFromCache
      message = 'Posts retrieved from cache!'
    }else{
      const posts = await prisma.post.findMany({
          include: {
            author: true,
            content: true,
          }
        });
      const postDtos = GetPostDto.fromEntities(posts)
      await this.cache.set(this.cacheKey, postDtos)
      postsData = postDtos
    }
    
    return {
      message,
      data: postsData
    }
  }

  async findAllByAuthorId(authorId: string) {
    // stage-1:  find from cache
    const postsFromCache = await this.cache.get(this.cacheKey)
    if(postsFromCache !== null){
      const posts = postsFromCache.filter((post: any) => post?.author?.id === authorId)
      if(posts.length > 0){
        return {
          message: 'Posts retrieved from cache!',
          data: posts
        }
      }
    }

    const posts =await prisma.post.findMany({
      where: {
        authorId: authorId
      },
      include: {
        author: true,
        content: true,
      }
    })
    return {
      message: "Posts retrieved successfully",
      data: posts
    }
  }


  async search(searchText: string, filters: string[] = []) {
    console.log(filters);
    const response = await meiliSearchService.search(searchText, filters);
    return {
      message: 'Posts retrieved successfully!',
      data: response.hits
    }
  }

 async findOne(id: string) {
    const postFromCache = await this.cache.getSingleValue(this.cacheKey, id)

    if(postFromCache !== null){
      return {
        message: 'Post retrieved from cache successfully!',
        data: postFromCache
      }
    }

    const post = await prisma.post.findUnique({
      where: {
        id
      },
      include: {
        author: true,
        content: true,
      }
    });
    if (!post) {
      return {
        message: 'Post not found!',
        statusCode: 404
      };
    }
    const postDto = GetPostDto.fromEntity(post);

    return {
      message: 'Post retrieved successfully!',
      data: postDto
    };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const {title, slug, tags, content, category, thumbnail} = updatePostDto;
    const post = await prisma.post.update({
      where: {
        id
      },
      data: {
        title,
        slug,
        tags,
        category,
        thumbnail,
        content: {
          update: content.map((section) => ({
           where: {
            id: section.id
           },
           data: {
             title: section.title,
            images: section.images,
            description: section.description,
           }
          })),  
        },
      },
      include: {
        author: true,
        content: true
      },
    });
    if (!post) {
      return {
        message: 'Post not found!',
        statusCode: 404
      };
    }

    const postDto = GetPostDto.fromEntity(post);

    // update to meilisearch
    await meiliSearchService.addBlogsToMeiliSearch([postDto])
    // update to cache
    await this.cache.updateValue(this.cacheKey, postDto)

    return {
      message: 'Post updated successfully!',
      statusCode: 200,
    }
  }

 async remove(id: string) {
    const post = await prisma.post.delete({
      where: {
        id
      }
    });
    if (!post) {
      return {
        message: 'Post not found!',
        statusCode: 404
      };
    }

    const postDto = GetPostDto.fromEntity(post);
    // remove from meilisearch
    await meiliSearchService.deleteBlogFromMeiliSearch(id)
    // remove from cache
    await this.cache.deleteValue(this.cacheKey, postDto)

    return {
      message: 'Post deleted successfully!',
      statusCode: 200,
    }
  }

   isMulterFile(file: any): file is Express.Multer.File {
    return typeof file === "object" && file !== null
  }

  }

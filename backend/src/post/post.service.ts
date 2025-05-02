import { GoogleDriveService } from 'src/file-uploader/google.drive.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { meiliSearchService } from 'src/search-library/meilisearch.service';
import { RedisCacheService } from 'src/cache/cache.service';
import compareArrayAndReturnUnmatched from 'src/utility/compareArray';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  private readonly cacheKey = 'posts';
  
  constructor(private readonly cache: RedisCacheService,private readonly googleDriveService: GoogleDriveService, private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const {title, slug, tags, content, category, thumbnail, authorId, description} = createPostDto;
   await this.prisma.post.create({data: {
      title,
      slug,
      tags,
      category,
      thumbnail,
      authorId,
      description,
      content: {
        create: content.map((section) => ({
          title: section.title,
          images: section.images,
          description: section.description,
        })),  
      },
    }});

    const post = await this.prisma.post.findUnique({
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
    if(postsFromCache !== null && postsFromCache){
      postsData = postsFromCache
      message = 'Posts retrieved from cache!'
    }else{
      const posts = await this.prisma.post.findMany({
          include: {
            author: true,
            content: true,
          },
          orderBy: {
            createdAt: "desc"
          }
        });
      const postDtos = GetPostDto.fromEntities(posts)
      await this.cache.set(this.cacheKey, postDtos)
      postsData = postDtos
    }
    
    return {
      message,
      data: postsData,
       statusCode: 200,
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

    const posts =await this.prisma.post.findMany({
      where: {
        authorId: authorId
      },
      include: {
        author: true,
        content: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return {
      message: "Posts retrieved successfully",
      data: posts,
       statusCode: 200,
    }
  }

  async getLatestPosts(limit = 5) {
    const latestPosts = await this.prisma.post.findMany({
       include: {
        author: true,
        content: true
       },
        take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });


    return {
      message: "Latest posts fetched successfully!",
      statusCode: 200,
      data: latestPosts
    }
  }

  async search(searchText: string, filters: string[] = []) {
    const response = await meiliSearchService.search(searchText, filters);
    return {
      message: 'Posts retrieved successfully!',
      data: response.hits,
       statusCode: 200,
    }
  }

 async findOne(id: string) {
    const postFromCache = await this.cache.getSingleValue(this.cacheKey, id)

    if(postFromCache !== null && postFromCache){
      return {
        message: 'Post retrieved from cache successfully!',
        data: postFromCache,
         statusCode: 200,
      }
    }

    const post = await this.prisma.post.findUnique({
      where: {
        id
      },
      include: {
        author: true,
        content: true,
      }
    });
    if (!post) {
       throw new HttpException('Post was not found', HttpStatus.NOT_FOUND);
    }
    
    const postDto = GetPostDto.fromEntity(post);

    return {
      message: 'Post retrieved successfully!',
      data: postDto,
       statusCode: 200,
    };
  }

 async findOneBySlug(slug: string) {
    const postFromCache = await this.cache.getSinglePostBySlug(this.cacheKey, slug)

    if(postFromCache !== null && postFromCache){
      return {
        message: 'Post retrieved from cache successfully!',
        data: postFromCache,
         statusCode: 200,
      }
    }

    const post = await this.prisma.post.findUnique({
      where: {
        slug
      },
      include: {
        author: true,
        content: true,
      }
    });
    if (!post) {
       throw new HttpException('Post was not found', HttpStatus.NOT_FOUND);
    }

    const postDto = GetPostDto.fromEntity(post);

    return {
      message: 'Post retrieved successfully!',
      data: postDto,
       statusCode: 200,
    };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const {title, slug, tags, content, category, thumbnail} = updatePostDto;
    const post = await this.prisma.post.update({
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
       throw new HttpException('Post was not found', HttpStatus.NOT_FOUND);
    }

    const postDto = GetPostDto.fromEntity(post);

    // update to meilisearch
    await meiliSearchService.addBlogsToMeiliSearch([postDto])
    // update to cache
    await this.cache.updateValue(this.cacheKey, postDto)

    // delete unused images from drive
    const oldImages = postDto.content.map((section) => section.images).flat()
    const newImages = content.map((section) => section.images).flat()

    const imagesToDelete = compareArrayAndReturnUnmatched([...oldImages, postDto?.thumbnail], [...newImages, thumbnail])

    if(imagesToDelete.length > 0){
      await this.googleDriveService.deleteMultipleFiles(imagesToDelete)
    }

    return {
      message: 'Post updated successfully!',
      statusCode: 200,
    }
  }

   async remove(id: string) {
    const post = await this.prisma.post.delete({
      where: {
        id
      }
    });
    if (!post) {
      throw new HttpException('Post was not found', HttpStatus.NOT_FOUND);
    }

    const postDto = GetPostDto.fromEntity(post);
    // remove from meilisearch
    await meiliSearchService.deleteBlogFromMeiliSearch(id)
    // remove from cache
    await this.cache.deleteValue(this.cacheKey, postDto)

    // delete images from drive
    const imagesToDelete = [postDto?.thumbnail, ...postDto.content.map((section) => section.images).flat()]

    if(imagesToDelete.length > 0){
      await this.googleDriveService.deleteMultipleFiles(imagesToDelete)
    }

    return {
      message: 'Post deleted successfully!',
      statusCode: 200,
    }
  }

  }

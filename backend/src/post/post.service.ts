import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { prisma } from 'src/db';
import { GetPostDto } from './dto/get-post.dto';
import { meiliSearchService } from 'src/search-library/meilisearch.service';

@Injectable()
export class PostService {
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
    await meiliSearchService.addBlogsToMeiliSearch([postDto])


    return {
      message: 'Post created successfully!',
      statusCode: 201,
    }
  }

  async findAll() {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        content: true,
      }
    });
    const postDtos = GetPostDto.fromEntities(posts)
    return {
      message: 'Posts retrieved successfully!',
      data: postDtos
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
      }
    });
    if (!post) {
      return {
        message: 'Post not found!',
        statusCode: 404
      };
    }
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
    return {
      message: 'Post deleted successfully!',
      statusCode: 200,
    }
  }
  }

import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { prisma } from 'src/db';
import { GetPostDto } from './dto/get-post.dto';

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

 async findOne(id: string) {
    const post = await prisma.post.findUnique({
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

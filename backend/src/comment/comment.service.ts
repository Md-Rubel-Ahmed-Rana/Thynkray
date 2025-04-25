import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
 async  create(createCommentDto: CreateCommentDto) {
    await this.prisma.comment.create({
      data: createCommentDto
    })
    return {
      message: 'Comment created successfully',
      statusCode: 201
    }
  }

  async findAll() {
    const comments = await this.prisma.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile_image: true
          }
        },
        post: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })
    const commentDtos = GetCommentDto.fromEntities(comments)
    return {
      message: 'Comments retrieved successfully',
      statusCode: 200,
      data: commentDtos
    }
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile_image: true
          }
        },
        post: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    if (!comment) {
      return {
        message: 'Comment not found',
        statusCode: 404
      }
    }
    const commentDto = GetCommentDto.fromEntity(comment)
    return {
      message: 'Comment retrieved successfully',
      statusCode: 200,
      data: commentDto
    }

  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    await this.prisma.comment.update({
      where: {
        id
      },
      data: {...updateCommentDto}
    })
    return {
      message: 'Comment updated successfully',
      statusCode: 200
    }
  }

  async remove(id: string) {
    await this.prisma.comment.delete({
      where: { id: id }
    })
    return {
      message: 'Comment deleted successfully',
      statusCode: 200
    }
  }
}

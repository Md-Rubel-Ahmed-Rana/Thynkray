import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
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
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    const commentDtos = GetCommentDto.fromEntities(comments)
    return {
      message: 'Comments retrieved successfully',
      statusCode: 200,
      data: commentDtos
    }
  }

  async findAllByPostId(id: string) {
    const comments = await this.prisma.comment.findMany({
      where: {postId: id},
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
      },
      orderBy: {
        createdAt: "desc"
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
      throw new HttpException('Comment was not found', HttpStatus.NOT_FOUND);
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
      data: {...updateCommentDto},
    })

    return {
      message: 'Comment updated successfully',
      statusCode: 200
    }
  }

  async remove(id: string) {
   const comment =  await this.prisma.comment.findUnique({
      where: { id: id }
    })

    if(!comment){
      throw new HttpException("Comment was not found", HttpStatus.NOT_FOUND)
    }

    await this.prisma.comment.delete({
      where: { id: id }
    })

    return {
      message: 'Comment deleted successfully',
      statusCode: 200
    }
  }
}

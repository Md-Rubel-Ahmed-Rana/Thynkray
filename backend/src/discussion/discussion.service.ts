import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscussionService {
  constructor(private readonly prisma: PrismaService){}
  async create(createDiscussionDto: CreateDiscussionDto){
    await this.prisma.discussion.create({data: createDiscussionDto})
    return {
      statusCode: 201,
      success: true,
      message: "Discussion created successfully",
      data: null
    }
  }

  async findAll(page: number = 1, limit: number  =10) {
    // I want to get page 2 and limit 10
    // Explanation
    // 1. the final result will be like it will skip total 20 data and return 10 data from 21-30

    const skip = (page - 1) * limit;
    const take = limit;
    const discussions  = await this.prisma.discussion.findMany({
      include: {
        user: true,
        _count: {
          select: {
            answers: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      skip,
      take 
    })
    const total = await this.prisma.discussion.findMany({})
    return {
      statusCode: 200,
      success: true,
      message: "Discussions retrieved successfully",
      data: {
        discussions,
        totalCount: total?.length || 0,
        limit,
        page
      }
    }
  }

 async findOne(id: string, page: number = 1, limit: number  =10) {
  await this.isDiscussionExist(id)
  const skip = (page - 1) * limit;
    const take = limit;
   const discussion =   await this.prisma.discussion.findUnique({
      where: {id},
      include: {
        user: true,
        answers: {
          include: {
            user: true
          },
          omit: {
            userId: true,
            discussionId: true
          },
          orderBy: {
            createdAt: "desc"
          },
          skip,
          take,
        },
        _count: {
          select: {
            answers: true
          }
        }
      },
      omit: {
        userId: true,
      }
    })
    return {
      statusCode: 200,
      success: true,
      message: "Discussion retrieved successfully",
      data: discussion
    }
  }

  async update(id: string, updateDiscussionDto: UpdateDiscussionDto) {
    await this.isDiscussionExist(id)
    await this.prisma.discussion.update({
      where: {id},
      data: updateDiscussionDto
    })
    return {
      statusCode: 200,
      success: true,
      message: "Discussion updated successfully",
      data: null
    }
  }

  async remove(id: string) {
    await this.isDiscussionExist(id)
    await this.prisma.discussion.delete({where: {id}})
    return {
      statusCode: 200,
      success: true,
      message: "Discussion deleted successfully",
      data: null
    }
  }

  async isDiscussionExist(id: string) {
    const discussion =  await this.prisma.discussion.findUnique({where: {id}})
    if(!discussion){
      throw new HttpException("Discussion was not found", HttpStatus.NOT_FOUND)
    }else{
      return
    }
  }
}

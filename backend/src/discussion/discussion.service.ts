import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetDiscussionDto } from './dto/get-discussion.dto';
import { Discussion, Prisma } from '@prisma/client';

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

  async findAll(
    page: number = 1, 
    limit: number  =10, 
    sortBy: "asc" | "desc" = "desc", 
    searchText: string = ""
  ) {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: Prisma.DiscussionWhereInput = searchText
    ? {
        OR: [
          { title: { contains: searchText, mode: 'insensitive' } },
          { description: { contains: searchText, mode: 'insensitive' } }
        ]
      }
    : {};

    const discussions  = await this.prisma.discussion.findMany({
      where,
      include: {
        user: true,
        _count: {
          select: {
            answers: true
          }
        }
      },
      orderBy: {
        createdAt: sortBy
      },
      skip,
      take 
    })
    const total = await this.prisma.discussion.findMany({})
    const dtosData = discussions.map((discuss) => GetDiscussionDto.sanitize(discuss))
    return {
      statusCode: 200,
      success: true,
      message: "Discussions retrieved successfully",
      data: {
        discussions: dtosData,
        totalCount: total?.length || 0,
        limit,
        page
      }
    }
  }

  async findAllByUser(userId: string) {
    const discussions  = await this.prisma.discussion.findMany({
      where: {userId},
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
      omit: {
        userId: true
      }
    })
    const dtosData = discussions.map((discuss) => GetDiscussionDto.sanitize(discuss))
    return {
      statusCode: 200,
      success: true,
      message: "Discussions retrieved successfully",
      data: dtosData
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

  async incrementViews(id: string){
     const discussion =  await this.isDiscussionExist(id)

    await this.prisma.discussion.update({
      where: {id},
      data: {
        views: {increment: 1},
        updatedAt: discussion.updatedAt
      }
    })

    return {
      statusCode: 200,
      success: true,
      message: "Discussion views incremented successfully",
      data: null
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

  async isDiscussionExist(id: string): Promise<Discussion> {
    const discussion =  await this.prisma.discussion.findUnique({where: {id}})
    if(!discussion){
      throw new HttpException("Discussion was not found", HttpStatus.NOT_FOUND)
    }else{
      return discussion
    }
  }
}

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

  async findAll() {
    const discussions  = await this.prisma.discussion.findMany({
      include: {
        user: true,
        _count: {
          select: {
            answers: true
          }
        }
      }
    })
    return {
      statusCode: 200,
      success: true,
      message: "Discussions retrieved successfully",
      data: discussions
    }
  }

 async findOne(id: string) {
  await this.isDiscussionExist(id)
   const discussion =   await this.prisma.discussion.findUnique({
      where: {id},
      include: {
        user: true,
        answers: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            answers: true
          }
        }
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
    return await this.prisma.discussion.delete({where: {id}})
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

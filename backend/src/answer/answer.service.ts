import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAnswerDto } from './dto/get-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService){}
  async create(createAnswerDto: CreateAnswerDto) {
    await this.prisma.answer.create({data: createAnswerDto})
    return {
      statusCode: 201,
      success: true,
      message: "Answer added successfully!",
      data: null
    }
  }

  async findAll() {
    const answers = await this.prisma.answer.findMany({
      include: {
        discussion: true,
        user: true
      }
    })
    const dtos = GetAnswerDto.fromEntities(answers)
    return {
      statusCode: 20,
      success: true,
      message: "Answers retrieved successfully!",
      data: dtos
    }
  }

  async findAllByDiscussion(discussionId: string) {
    const answers = await this.prisma.answer.findMany({
      where: {discussionId},
      include: {
        discussion: true,
        user: true
      }
    })
    const dtos = GetAnswerDto.fromEntities(answers)
    return {
      statusCode: 200,
      success: true,
      message: "Answers retrieved successfully!",
      data: dtos
    }
  }

  async findAllByUser(userId: string) {
    const answers = await this.prisma.answer.findMany({
      where: {userId},
      include: {
        discussion: true,
        user: true
      }
    })
    const dtos = GetAnswerDto.fromEntities(answers)
    return {
      statusCode: 200,
      success: true,
      message: "Answers retrieved successfully!",
      data: dtos
    }
  }

  async findOne(id: string) {
    await this.isAnswerExist(id)
    const answer = await this.prisma.answer.findUnique({
      where: {id},
      include: {
        discussion: true,
        user: true
      }
    })
    const dtos = GetAnswerDto.fromEntity(answer)
    return {
      statusCode: 200,
      success: true,
      message: "Answer retrieved successfully!",
      data: dtos
    }
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    await this.isAnswerExist(id)
    await this.prisma.answer.update({
      where: {id},
      data: {...updateAnswerDto}
    })
    return {
      statusCode: 200,
      success: true,
      message: "Answer updated successfully!",
      data: null
    }
  }

  async remove(id: string) {
    await this.isAnswerExist(id)
    await this.prisma.answer.delete({where: {id}})
    return {
      statusCode: 200,
      success: true,
      message: "Answer deleted successfully!",
      data: null
    }
  }

  async isAnswerExist(id: string) {
    const answer = await this.prisma.answer.findUnique({where: {id}})
    if(!answer){
      throw new HttpException("Answer was not found", HttpStatus.NOT_FOUND)
    }
  }
}

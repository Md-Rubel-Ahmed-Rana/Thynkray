import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerCreateResponseDto, CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { GetAnswersResponseDto } from './dto/get-answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiCreatedResponse({
    description: 'Create or add new answer to a discussion',
    type: AnswerCreateResponseDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @ApiOkResponse({
    description: 'Find All answers',
    type: GetAnswersResponseDto,
  })
  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @ApiOkResponse({
    description: 'Find All answers by discussion',
    type: GetAnswersResponseDto,
  })
  @Get('/by-discussion/:discussionId')
  findAllByDiscussion(@Param('discussionId') discussionId: string) {
    return this.answerService.findAllByDiscussion(discussionId);
  }

  @ApiOkResponse({
    description: 'Find All answers by user',
    type: GetAnswersResponseDto,
  })
  @Get('/by-user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.answerService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(id);
  }
}

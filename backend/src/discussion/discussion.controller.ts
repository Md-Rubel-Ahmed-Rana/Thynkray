import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto, DiscussionCreateResponseDto } from './dto/create-discussion.dto';
import { DiscussionUpdateResponseDto, UpdateDiscussionDto } from './dto/update-discussion.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { DiscussionGetResponseDto, DiscussionsGetResponseDto } from './dto/get-discussion.dto';
import { DiscussionDeleteResponseDto } from './dto/delete-discussion.dto';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiCreatedResponse({
    description: 'Create new discussion',
    type: DiscussionCreateResponseDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createDiscussionDto: CreateDiscussionDto) {
    return this.discussionService.create(createDiscussionDto);
  }

  @ApiOkResponse({
    description: 'Find all discussions',
    type: DiscussionsGetResponseDto,
  })
  @Get()
  findAll(
    @Query("limit")  limit: number, 
    @Query("page")  page: number, 
    @Query("sortBy") sortBy: "asc" | "desc", 
    @Query("searchText")  searchText: string
  ) {
    const pageNumber = page ? Number(page) : 1
    const limitCount = limit ? Number(limit) : 10
    return this.discussionService.findAll(pageNumber, limitCount, sortBy, searchText);
  }

  @ApiOkResponse({
    description: 'Find all discussions by user',
    type: DiscussionsGetResponseDto,
  })
  @Get("/me/:id")
  findAllByUser(@Param('id') id: string) {
    return this.discussionService.findAllByUser(id);
  }

  @ApiOkResponse({
    description: 'Find a single discussion by id',
    type: DiscussionGetResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Query("limit")  limit: number, @Query("page")  page: number) {
    const pageNumber = page ? Number(page) : 1
    const limitCount = limit ? Number(limit) : 10
    return this.discussionService.findOne(id, pageNumber, limitCount);
  }

  @ApiOkResponse({
    description: 'Update a single discussion by id',
    type: DiscussionUpdateResponseDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionService.update(id, updateDiscussionDto);
  }

  @ApiOkResponse({
    description: 'Delete a single discussion by id',
    type: DiscussionDeleteResponseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discussionService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentCreateResponseDto, CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckOwnership } from 'src/common/decorators/ownership.decorators';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CommentResponseDto, CommentsResponseDto } from './dto/get-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiCreatedResponse({
    description: 'Comment created successfully',
    type: CommentCreateResponseDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOkResponse({
    description: 'Find all comments',
    type: CommentsResponseDto,
  })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOkResponse({
    description: 'Find single comment by id',
    type: CommentResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Find comments by post id',
    type: CommentsResponseDto,
  })
  @Get('/post/:postId')
  findAllByPostId(@Param('postId') postId: string) {
    return this.commentService.findAllByPostId(postId);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Update comment',
    description: `
    Update a comment by id. 
    Requires authentication. Only the owner of the data (the user themselves) can perform this operation.
    `
  })
  @ApiOkResponse({
    description: "Comment updated successfully!"
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @CheckOwnership({
      service: CommentService,
      fetchMethod: "findOne",
      ownerField: "user.id",
      paramFieldName: "id"
    })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Delete comment',
    description: `
    Delete a comment by id.
    Requires authentication. Only the owner of the data (the user themselves) can perform this operation.
    `
  })
  @ApiOkResponse({
    description: "Comment deleted successfully!"
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @CheckOwnership({
    service: CommentService,
    fetchMethod: "findOne",
    ownerField: "user.id",
    paramFieldName: "id"
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}

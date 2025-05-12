import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckOwnership } from 'src/common/decorators/ownership.decorators';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { ApiBearerAuth, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @SkipThrottle()
  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @SkipThrottle()
  @Get("/category/:category")
  getPostsByCategory(@Param("category") category: string) {
    return this.postService.getPostsByCategory(category);
  }

  @Get("/author/:authorId")
  findAllByAuthorId(@Param("authorId") authorId: string) {
    return this.postService.findAllByAuthorId(authorId);
  }

  @SkipThrottle()
  @Get('latest')
  getLatestPosts(@Query('limit') limit: number) {
    return this.postService.getLatestPosts(Number(limit || 5));
  }

  @SkipThrottle()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  
  @SkipThrottle()
  @Get('slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.postService.findOneBySlug(slug);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Update post info',
    description: 'Requires authentication. Only the owner of the data (the user themselves) can perform this operation.'
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @CheckOwnership({
    service: PostService,
    fetchMethod: "findOne",
    ownerField: "author.id",
    paramFieldName: "id"
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }


  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Delete post',
    description: 'Requires authentication. Only the owner of the data (the user themselves) can perform this operation.'
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @CheckOwnership({
    service: PostService,
    fetchMethod: "findOne",
    ownerField: "author.id",
    paramFieldName: "id"
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
 
}

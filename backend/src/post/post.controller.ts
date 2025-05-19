import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, PostCreateResponseDto,  } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckOwnership } from 'src/common/decorators/ownership.decorators';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PostResponseDto, PostsResponseDto } from './dto/get-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiCreatedResponse({
    description: 'Create new post',
    type: PostCreateResponseDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOkResponse({
    description: "Find all the posts",
    type: PostsResponseDto
  })
  @SkipThrottle()
  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @ApiOkResponse({
    description: "Find all posts of a category",
    type: PostsResponseDto
  })
  @SkipThrottle()
  @Get("/category/:category")
  getPostsByCategory(@Param("category") category: string) {
    return this.postService.getPostsByCategory(category);
  }

  @ApiOkResponse({
    description: "Find all the posts of an author",
    type: PostsResponseDto
  })
  @Get("/author/:authorId")
  findAllByAuthorId(@Param("authorId") authorId: string) {
    return this.postService.findAllByAuthorId(authorId);
  }

  @ApiOkResponse({
    description: "Find some latest posts",
    type: PostsResponseDto
  })
  @SkipThrottle()
  @Get('latest')
  getLatestPosts(@Query('limit') limit: number) {
    return this.postService.getLatestPosts(Number(limit || 5));
  }

  @ApiOkResponse({
    description: "Find single post by id",
    type: PostResponseDto
  })
  @SkipThrottle()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  
  @ApiOkResponse({
    description: "Find single post by slug",
    type: PostResponseDto
  })
  @SkipThrottle()
  @Get('slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.postService.findOneBySlug(slug);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Update post info',
    description: `
    Update a post by id,
    Requires authentication. Only the owner of the data (the user themselves) can perform this operation.
    `
  })
  @ApiOkResponse({
    description: "Update a single post",
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

  @ApiOkResponse({
    description: "Increment views of a post by id",
  })
  @Patch(':id/views')
  incrementViews(@Param('id') id: string) {
    return this.postService.incrementViews(id);
  }


  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Delete post',
    description: `
    Delete a post by id.
    Requires authentication. Only the owner of the data (the user themselves) can perform this operation.
    `
  })
  @ApiOkResponse({
    description: "Delete a post by id",
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

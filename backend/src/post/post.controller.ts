import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { buildMeiliSearchFilters } from 'src/utility/parseFiltersQuery';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckOwnership } from 'src/decorators/ownership.decorators';
import { OwnershipGuard } from 'src/guards/ownership.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

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

  @UseGuards(AuthGuard)
  @Get("/author/:authorId")
  findAllByAuthorId(@Param("authorId") authorId: string) {
    return this.postService.findAllByAuthorId(authorId);
  }

  @SkipThrottle()
  @Get("/search")
  search(@Query("q") q: string, @Query("filters") filters: string) {
    const parsedFilters = buildMeiliSearchFilters(filters);
    return this.postService.search(q, parsedFilters);
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

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { buildMeiliSearchFilters } from 'src/utility/parseFiltersQuery';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @SkipThrottle()
  @Get()
  findAll() {
    return this.postService.findAll()
  }

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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}

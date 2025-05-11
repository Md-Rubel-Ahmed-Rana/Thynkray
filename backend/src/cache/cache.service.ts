import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GetPostDto } from "src/post/dto/get-post.dto";
import { RedisConfigService } from "src/config/redis";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RedisCacheService {
  private client: RedisConfigService;
  private readonly cacheTTL = 60 * 60 * 24 * 30;
  private readonly cacheKey = {posts: "posts"};
  constructor(
    client: RedisConfigService,
    private readonly prisma: PrismaService
  ) {
    this.client = client;
  }

  async set(key: string, value: any) {
    await this.client.getClient().set(key, JSON.stringify(value), {
      EX: this.cacheTTL,
    });
  }

  async get(key: string) {
    const value = await this.client.getClient().get(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  async deleteAllPosts(){
    const result = await this.client.getClient().del(this.cacheKey.posts)
    return {
      statusCode: 200,
      message: "All the posts deleted from cache",
      data: result
    }
  }

  async setAllPosts(){
    const posts =  await this.prisma.post.findMany({
      include: {
       author: true,
       content: true,
       _count: {
         select: {
           comments: true
         }
        }
     }
   })
   const postDtos = GetPostDto.fromEntities(posts)
   await this.client.getClient().del(this.cacheKey.posts)
   const result = await this.client.getClient().set(this.cacheKey.posts, JSON.stringify(postDtos))
   return {
    statusCode: 200,
    message: "All the posts added to cache",
    data: result
  }

  }

  @OnEvent('post.created')
  async postCreatedEvent(post: GetPostDto){
    console.log({
      from: "Cache service",
      message: "New post created event fired",
      data: post
    });
    const cacheKey = this.cacheKey.posts
    const posts = await this.get(cacheKey)
    if(posts){
      await this.set(cacheKey, [post,...posts])
    }else{
      await this.set(cacheKey, [post])
    }
  }

  @OnEvent('post.updated')
  async postUpdatedEvent(updatedPost: GetPostDto){
    console.log({
      from: "Cache service",
      message: "Post updated event fired",
      data: updatedPost
    });
    const cacheKey = this.cacheKey.posts
    const posts = await this.get(cacheKey)
    if(posts){
      const updatedPosts = posts.map((c: GetPostDto)=> 
        c.id === updatedPost?.id ? updatedPost : c
      );
      await this.set(cacheKey, updatedPosts);
    }else{
      await this.set(cacheKey, [updatedPost])
    }
  }

  @OnEvent('post.deleted')
  async postDeletedEvent(id: string) {
     console.log({
      from: "Cache service",
      message: "Post deleted event fired",
      data: {id}
    });
    const cacheKey = this.cacheKey.posts;
    const posts = await this.get(cacheKey);

    if (!posts) return;

    const restPosts = posts.filter((c: GetPostDto) => c.id !== id);
    await this.set(cacheKey, restPosts);
  }

}

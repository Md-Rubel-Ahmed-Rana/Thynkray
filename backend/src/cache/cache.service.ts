import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GetPostDto } from "src/post/dto/get-post.dto";
import { RedisConfigService } from "src/config/redis";

@Injectable()
export class RedisCacheService {
  private client: RedisConfigService;
  private readonly cacheTTL = 60 * 60 * 24 * 30;
  private readonly cacheKey = {posts: "posts"};
  constructor(client: RedisConfigService) {
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
      await this.set(cacheKey, [...posts, post])
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
        c.id === updatedPosts?.id ? updatedPosts : c
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

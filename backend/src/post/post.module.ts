import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { RedisCacheService } from 'src/cache/cache.service';
import { RedisConfigService } from 'src/config/redis';

@Module({
  controllers: [PostController],
  providers: [PostService, RedisCacheService, RedisConfigService],
  exports: [RedisCacheService],
})
export class PostModule {}

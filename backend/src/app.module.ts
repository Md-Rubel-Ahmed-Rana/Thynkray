import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { RedisConfigService } from './config/redis';
import { RedisCacheService } from './cache/cache.service';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), PostModule, CommentModule, CacheModule],
  controllers: [AppController],
  providers: [AppService, RedisConfigService, RedisCacheService, CacheModule],
  exports: [RedisConfigService, RedisCacheService],
})
export class AppModule {}

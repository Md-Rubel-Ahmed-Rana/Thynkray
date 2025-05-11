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
import { GoogleDriveService } from './file-uploader/google.drive.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { FileUploaderModule } from './file-uploader/fileUploader.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { GlobalNewsModule } from './global-news/global-news.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MeilisearchModule } from './search-library/meilisearch.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobModule } from './cron-job/taskScheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }), 
    UserModule, 
    PostModule, 
    CommentModule, 
    CacheModule, 
    FileUploaderModule, 
    PrismaModule, 
    ThrottlerModule.forRoot({
      throttlers: [
          {
            name: 'short',
            ttl: 1000,
            limit: 3,
          },
          {
            name: 'medium',
            ttl: 10000,
            limit: 20
          },
          {
            name: 'long',
            ttl: 60000,
            limit: 100
          }
      ],
    }), 
    AuthModule, 
    GlobalNewsModule,
    MeilisearchModule,
    CronJobModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot()

  ],
  controllers: [AppController],
  providers: [
    AppService, 
    RedisConfigService, 
    RedisCacheService, 
    CacheModule, 
    GoogleDriveService, 
    PrismaService, {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
  exports: [RedisConfigService, RedisCacheService, GoogleDriveService],
})


export class AppModule  {}

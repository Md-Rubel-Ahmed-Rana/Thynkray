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
import { FileUploaderModule } from './file-uploader/FileUploader.module';
import { GoogleDriveService } from './file-uploader/google.drive.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }), UserModule, PostModule, CommentModule, CacheModule, FileUploaderModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, RedisConfigService, RedisCacheService, CacheModule, GoogleDriveService, PrismaService],
  exports: [RedisConfigService, RedisCacheService, GoogleDriveService],
})


export class AppModule  {}

import { Module } from '@nestjs/common';
import { TasksService } from './taskScheduler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from 'src/post/post.service';
import { RedisCacheService } from 'src/cache/cache.service';
import { GoogleDriveService } from 'src/file-uploader/google.drive.service';
import { RedisConfigService } from 'src/config/redis';
import { MeiliSearchService } from 'src/search-library/meilisearch.service';

@Module({
  providers: [TasksService, PrismaService, PostService, RedisCacheService, GoogleDriveService, RedisConfigService,  MeiliSearchService],
})
export class CronJobModule {}

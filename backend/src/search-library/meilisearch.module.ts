import { Module } from "@nestjs/common";
import { MeiliSearchService } from "./meilisearch.service";
import { MeilisearchController } from "./meilisearch.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PostService } from "src/post/post.service";
import { RedisCacheService } from "src/cache/cache.service";
import { RedisConfigService } from "src/config/redis";

@Module({
  imports: [PrismaModule],
  controllers: [MeilisearchController],
  providers: [
    MeiliSearchService,
    PrismaService,
    PostService,
    RedisCacheService,
    RedisConfigService,
  ],
  exports: [MeiliSearchService, PrismaService],
})
export class MeilisearchModule {}

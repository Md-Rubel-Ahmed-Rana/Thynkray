import { Module } from '@nestjs/common';
import { RedisConfigService } from 'src/config/redis';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheService } from './cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheController } from './cache.controller';

@Module({
  imports: [ConfigModule], 
  providers: [RedisConfigService, RedisCacheService, PrismaService],
  controllers: [CacheController],
  exports: [RedisCacheService],
})
export class CacheModule {}

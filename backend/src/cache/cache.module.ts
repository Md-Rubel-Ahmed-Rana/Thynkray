// cache/cache.module.ts
import { Module } from '@nestjs/common';
import { RedisConfigService } from 'src/config/redis';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheService } from './cache.service';

@Module({
  imports: [ConfigModule], 
  providers: [RedisConfigService, RedisCacheService],
  exports: [RedisCacheService],
})
export class CacheModule {}

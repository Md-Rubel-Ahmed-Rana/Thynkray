import { Module } from '@nestjs/common';
import { GlobalNewsService } from './global-news.service';
import { GlobalNewsController } from './global-news.controller';

@Module({
  controllers: [GlobalNewsController],
  providers: [GlobalNewsService],
})
export class GlobalNewsModule {}

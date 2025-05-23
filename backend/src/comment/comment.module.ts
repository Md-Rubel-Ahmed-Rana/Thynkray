import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  exports: [CommentService],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}

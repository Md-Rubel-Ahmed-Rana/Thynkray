import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), PostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

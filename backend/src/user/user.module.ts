import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileUploaderModule } from 'src/file-uploader/FileUploader.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [FileUploaderModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}

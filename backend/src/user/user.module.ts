import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileUploaderModule } from 'src/file-uploader/fileUploader.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [FileUploaderModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService],
})
export class UserModule {}

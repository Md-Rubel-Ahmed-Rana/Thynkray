import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileUploaderModule } from 'src/file-uploader/fileUploader.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import multer from 'multer';
import { multerOptions } from 'src/config/multer';
import { UpdateUserProfileImage } from 'src/middlewares/user.middleware';

const upload = multer(multerOptions);


@Module({
  imports: [FileUploaderModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService],
})

export class UserModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(upload.single("profile_image"), UpdateUserProfileImage)
        .forRoutes(
          { path: 'user/update-profile-picture/:id', method: RequestMethod.POST }, 
        );
    }
}

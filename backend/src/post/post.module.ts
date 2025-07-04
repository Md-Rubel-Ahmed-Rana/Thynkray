import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { RedisCacheService } from "src/cache/cache.service";
import { RedisConfigService } from "src/config/redis";
import { ManipulatePostMiddleware } from "src/middlewares/post.middleware";
import multer from "multer";
import { multerOptions } from "src/config/multer";
import { FileUploaderModule } from "src/file-uploader/fileUploader.module";
import { PrismaService } from "src/prisma/prisma.service";
import { ManipulatePatchMiddleware } from "src/middlewares/patch.middleware";

const upload = multer(multerOptions);

@Module({
  imports: [FileUploaderModule],
  controllers: [PostController],
  providers: [
    PostService,
    RedisCacheService,
    RedisConfigService,
    PrismaService,
  ],
  exports: [RedisCacheService, PostService],
})
export class PostModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(upload.any(), ManipulatePostMiddleware)
      .forRoutes({ path: "post", method: RequestMethod.POST });
    consumer
      .apply(upload.any(), ManipulatePatchMiddleware)
      .forRoutes({ path: "post/:id", method: RequestMethod.PATCH });
  }
}

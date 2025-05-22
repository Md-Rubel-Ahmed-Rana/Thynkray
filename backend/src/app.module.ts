import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { RedisConfigService } from "./config/redis";
import { RedisCacheService } from "./cache/cache.service";
import { CacheModule } from "./cache/cache.module";
import { GoogleDriveService } from "./file-uploader/google.drive.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { FileUploaderModule } from "./file-uploader/fileUploader.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { GlobalNewsModule } from "./global-news/global-news.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MeilisearchModule } from "./search-library/meilisearch.module";
import { ScheduleModule } from "@nestjs/schedule";
import { CronJobModule } from "./cron-job/taskScheduler.module";
import { LoggerModule } from "./common/logger/logger.module";
import { DiscussionModule } from "./discussion/discussion.module";
import { AnswerModule } from "./answer/answer.module";
import { QuotesModule } from "./quotes/quotes.module";
import { MongooseModule } from "@nestjs/mongoose";
import { PinoLogger } from "./common/logger/pino-logger.service";
import { OpenaiModule } from "./openai/openai.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    UserModule,
    PostModule,
    CommentModule,
    CacheModule,
    FileUploaderModule,
    PrismaModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: "short",
          ttl: 1000,
          limit: 3,
        },
        {
          name: "medium",
          ttl: 10000,
          limit: 20,
        },
        {
          name: "long",
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    AuthModule,
    GlobalNewsModule,
    MeilisearchModule,
    CronJobModule,
    LoggerModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    DiscussionModule,
    AnswerModule,
    QuotesModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, PinoLogger],
      useFactory: (config: ConfigService, logger: PinoLogger) => ({
        uri: config.get<string>("MONGODB_URI"),
        connectionFactory: (connection) => {
          connection.on("connected", () =>
            logger.log("✅ MongoDB connected successfully")
          );
          connection.on("error", (err: any) =>
            logger.error("❌ MongoDB connection error:", err.message)
          );
          return connection;
        },
      }),
    }),
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RedisConfigService,
    RedisCacheService,
    CacheModule,
    GoogleDriveService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [RedisConfigService, RedisCacheService, GoogleDriveService],
})
export class AppModule {}

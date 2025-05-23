/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/interceptors/ResponseInterceptor";
import morgan from "morgan";
import { RedisConfigService } from "./config/redis";
import { ValidationPipe } from "@nestjs/common";
import { ValidationExceptionFilter } from "./common/validation/validation-exception.filter";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import * as crypto from "crypto";
import { PinoLogger } from "./common/logger/pino-logger.service";
import { PrismaExceptionFilter } from "./common/prismaClientException";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new PinoLogger(),
  });

  const logger = app.get(PinoLogger);

  logger.log("Thynkray application is starting...");

  const configService = app.get(ConfigService);

  // set crypto as global
  const environment = configService.get("ENV");
  if (environment !== "development") {
    // @ts-ignore
    global.crypto = crypto;
  }

  const port = configService.get("PORT") && Number(configService.get("PORT"));

  // cors configuration
  app.enableCors({
    origin: ["http://localhost:3000", "https://thynkray.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  //  global middlewares
  app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalFilters(new PrismaExceptionFilter(logger));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.setGlobalPrefix("api/v1");
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cookieParser());

  // connect redis cache database
  const redis = app.get(RedisConfigService);
  await redis.connect();

  // generate api documentation
  const config = new DocumentBuilder()
    .setTitle("Thynkray API")
    .setDescription(
      `
  Welcome to the Thynkray API — the backend service for Thynkray, a modern platform for publishing, managing, and discovering high-quality articles and blogs. 

  This API provides endpoints for user management, article creation and updates, commenting, content curation, admin tools, and more.

  All responses follow a consistent structure, and most endpoints require authentication via JWT. Please refer to the security section for authorization guidelines.
  `
    )
    .setVersion("1.0")
    .addTag("Users", "Operations related to user accounts")
    .addTag("Articles", "Create, update, read, and delete blog posts")
    .addTag("Comments", "User comments on articles")
    .addTag("Search", "Full-text and filtered search functionalities")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, documentFactory);

  app.listen(port, async () => {
    logger.log(`Thynkray server is running at http://localhost:${port}`);
  });
}
bootstrap();

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/ResponseInterceptor';
import morgan from 'morgan';
import { RedisConfigService } from './config/redis';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './common/validation/validation-exception.filter';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
import { doubleCsrfOptions } from './utility/csrfOptions';
const {doubleCsrfProtection} = doubleCsrf(doubleCsrfOptions);


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const configService = app.get(ConfigService)
  
  const port = configService.get("PORT") && Number(configService.get("PORT"))
  
  // cors configuration
  app.enableCors({
    origin: ['http://localhost:3000', 'https://thynkray.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  
  //  global middlewares
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true, forbidNonWhitelisted: true}));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(doubleCsrfProtection);


  // connect redis cache database
 const redis = app.get(RedisConfigService);
 await redis.connect()

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();

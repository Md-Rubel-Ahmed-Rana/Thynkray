import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/ResponseInterceptor';
import morgan from 'morgan';
import { RedisConfigService } from './config/redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  const port = configService.get("PORT") && Number(configService.get("PORT")) || 6001

  app.enableCors({
    origin: ['http://localhost:3000', 'https://thynkray.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(morgan('dev'));

  // connect redis cache database
 const redis = app.get(RedisConfigService);
 await redis.connect()

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();

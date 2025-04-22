import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/ResponseInterceptor';
import  morgan from 'morgan';
const port = process.env.PORT || 6001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(morgan('dev'));

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();

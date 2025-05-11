import {  Global, Module } from '@nestjs/common';
import { PinoLogger } from './pino-logger.service';


@Global()
@Module({
  providers: [PinoLogger],
  exports: [PinoLogger],
})
export class LoggerModule {}

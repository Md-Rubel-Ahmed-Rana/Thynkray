import {  Module } from '@nestjs/common';
import { PinoLogger } from './pino-logger.service';

@Module({
  providers: [PinoLogger],
  exports: [PinoLogger],
})
export class LoggerModule {}

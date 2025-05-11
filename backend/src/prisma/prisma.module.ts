import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PinoLogger } from 'src/common/logger/pino-logger.service';

@Module({
  providers: [PrismaService, PinoLogger],
  exports: [PinoLogger]
})
export class PrismaModule {}

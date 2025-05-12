import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PinoLogger } from 'src/common/logger/pino-logger.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger
  ){
    super();
  }
  async onModuleInit() {
    this.logger.log("Database connecting...")
    try {
      await this.$connect();
      this.logger.log("Database connected successfully!")
    } catch (error : any) {
      this.logger.error(`Failed to connect to database. Error: ${error?.message}`);
    }
  }
}

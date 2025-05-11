import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { PinoLogger } from 'src/common/logger/pino-logger.service';

@Injectable()
export class RedisConfigService implements OnModuleInit {
  private client: RedisClientType;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger
  ) {
    this.client = createClient({
      username: this.configService.get<string>('REDIS_USERNAME'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
      socket: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
      },
    });

    this.client.on('error', (err) => this.logger.error(`Redis Client Error. Error: ${err?.message || err}`));
    this.client.on('connect', () => this.logger.log('Redis client connected'));
    this.client.on('ready', () => this.logger.log('Redis client is ready'));
    this.client.on('end', () => this.logger.log('Redis client disconnected'));
  }
  async onModuleInit() {
    this.logger.log('Redis client connecting...')
    await this.connect();
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  getClient(): RedisClientType {
    return this.client;
  }
}

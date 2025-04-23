import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisConfigService implements OnModuleInit {
  private client: RedisClientType;

  constructor(private readonly configService: ConfigService) {
    this.client = createClient({
      username: this.configService.get<string>('REDIS_USERNAME'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
      socket: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
      },
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    this.client.on('connect', () => console.log('Redis client connected'));
    this.client.on('ready', () => console.log('Redis client is ready'));
    this.client.on('end', () => console.log('Redis client disconnected'));
  }

  async onModuleInit() {
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

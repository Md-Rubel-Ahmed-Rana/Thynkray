import { Injectable, LoggerService } from "@nestjs/common";
import pino from "pino";


@Injectable()
export class PinoLogger implements LoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    this.logger = pino({
      transport: process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    });
  }

  private formatMessage(message: string) {
    return `[Thynkray] ${message}`;
  }

  log(message: string) {
    this.logger.info(this.formatMessage(message));
  }

  error(message: string, trace?: string) {
    this.logger.error({ trace }, this.formatMessage(message));
  }

  warn(message: string) {
    this.logger.warn(this.formatMessage(message));
  }

  debug?(message: string) {
    this.logger.debug(this.formatMessage(message));
  }

  verbose?(message: string) {
    this.logger.trace(this.formatMessage(message));
  }
}

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (
      typeof exceptionResponse === 'object' &&
      (exceptionResponse as any).message instanceof Array
    ) {
      const messages = (exceptionResponse as any).message.map((msg: string) => {
        if (msg.includes('content.')) {
          return msg.replace(/^content\.(\d+)\./, (_, index) => `Section #${+index + 1} - `);
        }
        return msg;
      });

      response.status(status).json({
        statusCode: status,
        error: 'Bad Request',
        message: messages,
      });
    } else {
      response.status(status).json(exceptionResponse);
    }
  }
}

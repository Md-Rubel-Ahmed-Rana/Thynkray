import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PinoLogger } from '../logger/pino-logger.service';
  
@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientUnknownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
constructor(private readonly logger: PinoLogger) {}

catch(exception: Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientUnknownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected database error occurred';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
        case 'P1001':
            status = HttpStatus.NOT_FOUND;
            message = `Couldn't connect to database. Please make sure your database is running.`;
            break;
        case 'P2018':
            status = HttpStatus.NOT_FOUND;
            message = `The required connected records were not found. ${exception?.name} ${exception?.message}`;
            break;
        case 'P2002':
            status = HttpStatus.CONFLICT;
            message = `Unique constraint failed on field(s): ${(exception.meta as any)?.target?.join(', ')}`;
            break;
        case 'P2025':
            status = HttpStatus.NOT_FOUND;
            message = 'Record to update/delete does not exist';
            break;
        case 'P2003':
            status = HttpStatus.BAD_REQUEST;
            message = 'Foreign key constraint failed.';
            break;
        case 'P2011':
            status = HttpStatus.BAD_REQUEST;
            message = 'Null constraint violation on non-nullable field.';
            break;
        case 'P2012':
            status = HttpStatus.BAD_REQUEST;
            message = 'Missing required field.';
            break;
        default:
            message = `Prisma error [${exception.code}]`;
            break;
    }
    }

    this.logger.error(`Prisma error: ${exception.message}`, exception.stack);

    response.status(status).json({
    statusCode: status,
    message,
    });
}
}
  
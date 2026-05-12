import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { PostgresError } from './postgres.error.type';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : ((res as { message?: string | string[] }).message ?? res);
    } else if (exception instanceof QueryFailedError) {
      const driverError = exception.driverError as PostgresError | undefined;

      if (driverError?.code === '23505') {
        const detail = driverError.detail ?? '';

        if (detail.includes('email')) {
          status = HttpStatus.BAD_REQUEST;
          message = 'User with this email already exists';
        } else if (detail.includes('phone')) {
          status = HttpStatus.BAD_REQUEST;
          message = 'User with this phone number already exists';
        } else {
          status = HttpStatus.BAD_REQUEST;
          message = 'Duplicate field value violates unique constraint';
        }
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = driverError?.message ?? 'Database query failed';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}

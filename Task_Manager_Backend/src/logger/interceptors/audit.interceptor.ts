import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  HttpException,
} from '@nestjs/common';

import { Observable, tap, catchError, throwError } from 'rxjs';

import { Reflector } from '@nestjs/core';

import { Logger } from 'winston';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Request } from 'express';

import { AUDIT_LOG_KEY } from '../decorators/audit-log.decorator';

import { UserPayload } from '../../user/interfaces/user.payload';
import { AuthRequest } from '../../auth/requests/auth.request';

interface RequestWithUser extends Request {
  user?: UserPayload;
}

@Injectable()
export class AuditInterceptor<T> implements NestInterceptor<T, T> {
  constructor(
    private readonly reflector: Reflector,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const action = this.reflector.get<string>(
      AUDIT_LOG_KEY,
      context.getHandler(),
    );

    if (!action) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authRequest = context.switchToHttp().getRequest<AuthRequest>();

    const { method, originalUrl, query, params } = request;
    const { body } = authRequest;

    const user = request.user;

    const start = Date.now();

    return next.handle().pipe(
      tap((response: T) => {
        const duration = Date.now() - start;

        this.logger.info({
          type: 'AUDIT_LOG',

          action,

          user: {
            id: user?.sub,
          },

          request: {
            method,
            url: originalUrl,
            query,
            params,
            body,
          },

          response,

          duration: `${duration}ms`,
        });
      }),

      catchError((error: unknown) => {
        const duration = Date.now() - start;

        let message = 'Unknown error';
        let status = 500;

        if (error instanceof HttpException) {
          message = error.message;
          status = error.getStatus();
        }

        this.logger.error({
          type: 'AUDIT_ERROR',

          action,

          user: {
            id: user?.sub,
          },

          request: {
            method,
            url: originalUrl,
            query,
            params,
            body,
          },

          error: {
            message,
            status,
          },

          duration: `${duration}ms`,
        });

        return throwError(() => error);
      }),
    );
  }
}

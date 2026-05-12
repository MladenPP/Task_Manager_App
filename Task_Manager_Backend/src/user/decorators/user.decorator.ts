import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../interfaces/user.payload';
import { AuthRequest } from '../../auth/requests/auth.request';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);

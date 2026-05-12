import { Request } from 'express';
import { AuthCookies } from '../auth/interfaces/auth.cookie.interface';

export const cookieExtractor = (req: Request): string | null => {
  const cookies = req.cookies as AuthCookies | undefined;

  return cookies?.access_token ?? null;
};

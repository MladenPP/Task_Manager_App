import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { AuthSocket } from './ws.auth.socket';

export function wsAuthMiddleware(
  socket: AuthSocket,
  next: (err?: Error) => void,
): void {
  try {
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error('No cookie'));
    }

    const parsed = parse(rawCookie);
    const token = parsed.access_token;

    if (!token) {
      return next(new Error('No token'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === 'string') {
      return next(new Error('Invalid token'));
    }

    socket.user = decoded;

    next();
  } catch {
    next(new Error('Unauthorized'));
  }
}

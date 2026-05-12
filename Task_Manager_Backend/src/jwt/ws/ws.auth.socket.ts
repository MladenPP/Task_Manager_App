import { Socket } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthSocket extends Socket {
  user?: JwtPayload;
}

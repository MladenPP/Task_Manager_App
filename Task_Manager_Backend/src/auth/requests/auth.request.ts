import { UserPayload } from '../../user/interfaces/user.payload';

export type AuthRequest = Request & {
  user: UserPayload;
};

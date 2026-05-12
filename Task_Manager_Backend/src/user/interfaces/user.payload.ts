import { UserRole } from '../entities/user.role';

export interface UserPayload {
  sub: number;
  role: UserRole;
}

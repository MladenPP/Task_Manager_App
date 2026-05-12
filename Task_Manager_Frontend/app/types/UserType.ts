import { UserRole } from "./UserRole";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: UserRole;
};

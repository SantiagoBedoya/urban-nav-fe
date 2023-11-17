import { userRole } from './user-role.interface';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string;
  role: userRole;
  isBlocked: boolean;
}

import { Role } from '../../roles/interfaces/role.interface';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
  roleId?: string;
  role?: Role;
}

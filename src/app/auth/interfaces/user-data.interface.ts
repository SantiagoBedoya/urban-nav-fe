import { contact } from 'src/app/protected/interfaces/contact.interface';
import { Role } from 'src/app/protected/interfaces/role.interface';

export interface UserDataInterface {
  _id: string;
  contacts: contact[];
  role?: Role;
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
}

import { contact } from 'src/app/protected/interfaces/contact.interface';

export interface UserDataInterface {
  _id: string;
  contacts: contact[];
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
}

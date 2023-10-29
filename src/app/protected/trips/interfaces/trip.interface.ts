import { User } from '../../users/interfaces/user.interface';

export interface Trip {
  _id: string;
  price: number;
  status: string;
  route: string;
  clientId: string;
  driverId?: string;
  driver?: User;
  client?: User;
  startDate?: string;
  endDate?: string;
}

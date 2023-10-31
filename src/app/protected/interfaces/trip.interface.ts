import { User } from './user.inferface';

export interface Trip {
  _id: string;
  status: string;
  startDate?: string;
  endDate?: string;
  route: string;
  clientId: string;
  price?: number;
  driverId?: string;
  client?: User;
  driver?: User;
}

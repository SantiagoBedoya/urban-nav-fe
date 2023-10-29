import { User } from '../../users/interfaces/user.interface';

export interface TripComment {
  _id: string;
  comment: string;
  date: string;
  tripId: string;
  publisherId: string;
  receiverId: string;
  publisher: User;
  receiver: User;
}

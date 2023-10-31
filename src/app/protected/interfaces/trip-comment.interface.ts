import { User } from './user.inferface';

export interface TripComment {
  id: string;
  comment: string;
  date: string;
  tripId: string;
  publisherId: string;
  receiverId: string;
  publisher: User;
  receiver: User;
}

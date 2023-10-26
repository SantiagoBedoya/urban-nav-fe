import { Point } from './point.interface';

export interface RequestTrip {
  points: Omit<Point, 'description'>[];
  distance: number;
  price: number;
}

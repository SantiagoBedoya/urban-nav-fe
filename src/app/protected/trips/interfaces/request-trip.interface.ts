import { Point } from '../../points/interfaces/point.interface';

export interface RequestTrip {
  points: Point[];
  distance: number;
  price: number;
}

import { Edge } from './edge.interface';

export interface Point {
  _id: string;
  name: string;
  edges?: Edge[];
}

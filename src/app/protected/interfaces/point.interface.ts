export interface EdgePoint {
  weight: number;
  pointId: string;
}

export interface Point {
  _id: string;
  name: string;
  edges?: EdgePoint[];
}

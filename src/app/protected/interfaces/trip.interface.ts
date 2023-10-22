export interface Trip {
  _id: string;
  status: string;
  startDate?: string;
  endDate?: string;
  route: string;
  clientId:string;
  driverId?: string;
}

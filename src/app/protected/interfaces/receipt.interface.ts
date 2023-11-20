export interface Receipt {
  _id?: string;
  price: number;
  date?: Date;
  tripId: string;
  clientId: string;
  paymentMethodId: string;
}

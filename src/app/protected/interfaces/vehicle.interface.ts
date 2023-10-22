export interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  soatURL?: string;
  propertyCardURL?: string;
  mechanicCertificateURL?: string;
  userId?: string;
}

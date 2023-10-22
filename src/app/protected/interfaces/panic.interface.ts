import { contact } from "./contact.interface";
import { User } from "./user.inferface";
import { Vehicle } from "./vehicle.interface";

export interface Panic {
    driver: User;
    vehicle: Vehicle;
    origin: string;
    destination: string;
    userFullName: string;
}
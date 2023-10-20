import { contact } from "src/app/user/interface/contact.interface";

export interface UserDataInterface {
    _id: string;
    contacts: contact[];
    email: string;
    firstName: string;
    lastName: string;
    roleId: string
}
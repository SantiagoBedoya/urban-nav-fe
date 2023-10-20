import { createAction, props } from '@ngrx/store';
import { contact } from 'src/app/user/interface/contact.interface';

export const init = createAction('[validate-otp] Init');

export const setUserData = createAction(
  '[validate-otp] SetData',
  props<{
    _id: string;
    contacts: contact[];
    email: string;
    firstName: string;
    lastName: string;
    roleId: string;
  }>()
);

export const addContact = createAction(
  '[user-service] AddContact',
  props<{
    contact: contact;
  }>()
);

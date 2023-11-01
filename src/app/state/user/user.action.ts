import { createAction, props } from '@ngrx/store';
import { contact } from 'src/app/protected/interfaces/contact.interface';
import { Vehicle } from 'src/app/protected/interfaces/vehicle.interface';

export const init = createAction('[validate-otp] Init');

export const setUserData = createAction(
  '[validate-otp] SetData',
  props<{
    _id: string;
    contacts: contact[];
    email: string;
    firstName: string;
    lastName: string;
    photoURL?: string;
    vehicle?: Vehicle;
    roleName: string;
    permissions: number[];
  }>()
);

export const addContact = createAction(
  '[user-service] AddContact',
  props<{
    contact: contact;
  }>()
);

export const setContacts = createAction(
  '[user-service] setContact',
  props<{
    contacts: contact[];
  }>()
);

export const deleteContact = createAction(
  '[user-service] deleteContact',
  props<{
    index: number;
  }>()
);

export const updateProfileData = createAction(
  '[user-service] Update Profile Data',
  props<{ firstName: string; lastName: string }>()
);

export const setVehicle = createAction(
  '[profile] setVehicle', props<{vehicle: Vehicle}>()
)
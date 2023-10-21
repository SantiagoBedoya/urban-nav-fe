import { createReducer, on } from '@ngrx/store';
import { UserActions } from '..';
import { contact } from 'src/app/protected/interfaces/contact.interface';
import { Vehicle } from 'src/app/protected/interfaces/vehicle.interface';

export const userStateFeatureKey = 'userState';
const userProfile = JSON.parse(sessionStorage.getItem('user_data')!);
const driverVehicle = JSON.parse(sessionStorage.getItem('driver_vehicle')!);

export interface UserState {
  _id: string;
  contacts: contact[];
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  roleId: string;
  vehicle?: Vehicle;
}

const initialState: UserState = {
  _id: userProfile?._id ?? '',
  contacts: userProfile?.contacts ?? [],
  email: userProfile?.email ?? '',
  firstName: userProfile?.firstName ?? '',
  lastName: userProfile?.lastName ?? '',
  photo: userProfile?.lastName ?? '',
  roleId: userProfile?.roleId ?? '',
  vehicle: driverVehicle ?? {}
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.init, (currentState) => ({
    ...currentState,
  })),
  on(UserActions.setUserData, (currentState, action) => ({
    ...currentState,
    _id: action._id,
    firstName: action.firstName,
    lastName: action.lastName,
    email: action.email,
    contacts: action.contacts,
    roleId: action.roleId,
  })),
  on(UserActions.addContact, (currentState, action) => ({
    ...currentState,
    contacts: [...currentState.contacts, action.contact],
  })),
  on(UserActions.deleteContact, (currentState, action) => {
    const currentContacts = [...currentState.contacts];
    currentContacts.splice(action.index, 1);
    return {
      ...currentState,
      contacts: [...currentContacts],
    };
  }),
  on(UserActions.updateProfileData, (currentState, action) => ({
    ...currentState,
    firstName: action.firstName,
    lastName: action.lastName,
  })),
  on(UserActions.setVehicle, (currentState, action) => ({
    ...currentState,
    vehicle: action.vehicle,
  }))
);

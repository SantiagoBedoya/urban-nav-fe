import { createReducer, on } from '@ngrx/store';
import { UserActions } from '..';
import { contact } from 'src/app/protected/interfaces/contact.interface';
import { Vehicle } from 'src/app/protected/interfaces/vehicle.interface';

export const userStateFeatureKey = 'userState';
const userProfile = JSON.parse(sessionStorage.getItem('user_data')!);
const driverVehicle = JSON.parse(sessionStorage.getItem('driver_vehicle')!);
const testImgUrl =
  'https://www.joseivanaguilar.com/wp-content/uploads/2021/03/mujer.jpg';

export interface UserState {
  _id: string;
  contacts: contact[];
  email: string;
  firstName: string;
  lastName: string;
  photoURL: string;
  vehicle?: Vehicle;
  permissions: number[];
}

const initialState: UserState = {
  _id: userProfile?._id ?? '',
  contacts: userProfile?.contacts ?? [],
  email: userProfile?.email ?? '',
  firstName: userProfile?.firstName ?? '',
  lastName: userProfile?.lastName ?? '',
  photoURL: userProfile?.photoURL ?? testImgUrl,
  vehicle: driverVehicle ?? {},
  permissions: userProfile?.role?.permissions ?? []
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
    photoURL: action.photoURL ?? testImgUrl,
    permissions: action.permissions ?? []
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
  })),
  on(UserActions.setContacts, (currentState, action) => ({
    ...currentState,
    contacts: [...action.contacts]
  }))
);

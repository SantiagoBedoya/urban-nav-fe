import { createReducer, on } from '@ngrx/store';
import { UserActions } from '..';

export const userStateFeatureKey = 'userState';
const userProfile = JSON.parse(sessionStorage.getItem('user_data')!);

export interface UserState {
  _id: string;
  contacts: object[];
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
}

const initialState: UserState = {
  _id: userProfile?._id ?? '',
  contacts: userProfile?.contacts ?? [],
  email: userProfile?.email ?? '',
  firstName: userProfile?.firstName ?? '',
  lastName: userProfile?.lastName ?? '',
  roleId: userProfile?.roleId ?? ''
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
    roleId: action.roleId
  }))
);
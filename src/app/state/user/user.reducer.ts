import { createReducer, on } from '@ngrx/store';
import { UserActions } from '..';

export const userStateFeatureKey = 'userState';
const userProfile = JSON.parse(localStorage.getItem('user_data')!);

export interface UserState {
  firstName: string,
  lastName: string,
  email: string,
}

const initialState: UserState = {
  firstName: userProfile?.firstName ?? '',
  lastName: userProfile?.lastName ?? '',
  email: userProfile?.email ?? ''
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.init, (currentState) => ({
    ...currentState,
  })),
  on(UserActions.setUserData, (currentState, action) => ({
    ...currentState,
    firstName: action.firstName,
    lastName: action.lastName,
    email: action.email
  }))
);
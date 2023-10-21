import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '..';

export const authStateFeatureKey = 'authState';
const lgs = sessionStorage.getItem('isLogged');
const isLogged = lgs ? lgs === 'true' : false;

export interface AuthState {
  isLogged: boolean;
}

const initialState: AuthState = {
  isLogged: isLogged,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.init, (currentState) => ({
    ...currentState,
    isLogged: false,
  })),
  on(AuthActions.logOut, AuthActions.logIn, (currentState, action) => ({
    ...currentState,
    isLogged: action.isLogged,
  }))
);

import { createAction, props } from '@ngrx/store';

export const init = createAction('[validate-otp] Init');

export const logIn = createAction(
  '[validate-otp] Login',
  props<{ isLogged: boolean }>()
);

export const logOut = createAction(
  '[navbar] LogOut',
  props<{ isLogged: boolean }>()
);

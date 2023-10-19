import { createAction, props } from '@ngrx/store';

export const init = createAction('[validate-otp] Init');

export const setUserData = createAction(
  '[validate-otp] SetData',
  props<{
    _id: string;
    contacts: object[];
    email: string;
    firstName: string;
    lastName: string;
    roleId: string
  }>()
);

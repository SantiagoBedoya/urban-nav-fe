import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userStateFeatureKey } from './user.reducer';
const userState = createFeatureSelector<UserState>(userStateFeatureKey);

export const firstName = createSelector(
  userState,
  (userState) => userState.firstName
);

export const lastName = createSelector(
  userState,
  (userState) => userState.lastName
);

export const fullName = createSelector(
  firstName,
  lastName,
  (first, last) => `${first} ${last}`
);

export const email = createSelector(userState, (userState) => userState.email);

export const contacts = createSelector(
  userState,
  (userState) => userState.contacts
);

export const id = createSelector(userState, (userState) => userState._id);

export const photo = createSelector(
  userState,
  (userState) => userState.photoURL
);

export const vehicle = createSelector(
  userState,
  (userState) => userState.vehicle
);

export const permissions = createSelector(
  userState,
  (userState) => userState.permissions
);

export const roleName = createSelector(
  userState,
  (userState) => userState.roleName
);

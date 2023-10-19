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

export const email = createSelector(
  userState,
  (userState) => userState.email
);
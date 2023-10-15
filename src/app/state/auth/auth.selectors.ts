import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authStateFeatureKey } from './auth.reducer';

const authState = createFeatureSelector<AuthState>(authStateFeatureKey);

export const isLogged = createSelector(
  authState,
  (authState) => authState.isLogged
);

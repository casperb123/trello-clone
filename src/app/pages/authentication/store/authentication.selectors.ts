import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './authentication.reducer';

export const selectFeatureState =
  createFeatureSelector<reducer.State>('authentication');

export const selectAuthenticationState = createSelector(
  selectFeatureState,
  (state) => state
);

export const getLoggingInState = createSelector(
  selectAuthenticationState,
  (state) => state.loggingIn
);

export const getUserLoggedInState = createSelector(
  selectAuthenticationState,
  (state) => state.userLoggedIn
);

export const getLoginError = createSelector(
  selectAuthenticationState,
  (state) => state.loginError
);

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

export const getLoggedInState = createSelector(
  selectAuthenticationState,
  (state) => state.loggedIn
);

export const getLoginError = createSelector(
  selectAuthenticationState,
  (state) => state.loginError
);

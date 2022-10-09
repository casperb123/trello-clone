import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './authentication.reducer';

export const selectFeatureState =
  createFeatureSelector<reducer.State>('authentication');

export const selectAuthenticationState = createSelector(
  selectFeatureState,
  (state) => state
);

export const getIsLoggingIn = createSelector(
  selectAuthenticationState,
  (state) => state.loading
);

export const getUserLoggedIn = createSelector(
  selectAuthenticationState,
  (state) => state.userLoggedIn
);

export const getLoginError = createSelector(
  selectAuthenticationState,
  (state) => state.error
);

export const selectUserDataState = createSelector(
  selectAuthenticationState,
  (state) => state.userData
);

export const getUserDataLoading = createSelector(
  selectUserDataState,
  (state) => state.loading
);

export const getUserData = createSelector(
  selectUserDataState,
  (state) => state.userData
);

export const getUserDataError = createSelector(
  selectUserDataState,
  (state) => state.error
);

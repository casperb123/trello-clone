import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/pages/authentication/utilities/authentication.models';
import * as actions from './authentication.actions';

export interface State {
  loggingIn: boolean;
  userLoggedIn: User;
  loginError: string;
}

export const initialState: State = {
  userLoggedIn: null,
  loggingIn: false,
  loginError: null,
};

export const authenticationReducer = createReducer(
  initialState,
  on(actions.login, (state) => ({
    ...state,
    loggingIn: true,
    loginError: null,
  })),
  on(actions.loginSuccess, (state, action) => ({
    ...state,
    userLoggedIn: action.user,
    loggingIn: false,
  })),
  on(actions.loginError, (state, action) => ({
    ...state,
    loggingIn: false,
    loginError: action.error,
  })),
  on(actions.logout, (state) => ({
    ...state,
    userLoggedIn: null,
    loggingIn: false,
    loginError: null,
  }))
);

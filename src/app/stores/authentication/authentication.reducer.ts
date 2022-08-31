import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/pages/authentication/authentication.interfaces';
import * as actions from './authentication.actions';

export interface State {
  loggingIn: boolean;
  loggedIn: User;
  loginError: string;
}

export const initialState: State = {
  loggedIn: null,
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
    loggedIn: {
      email: action.response.email,
    },
    loggingIn: false,
  })),
  on(actions.loginError, (state, action) => ({
    ...state,
    loggingIn: false,
    loginError: action.error,
  })),
  on(actions.logout, (state) => ({
    ...state,
    loggedIn: null,
    loggingIn: false,
    loginError: null,
  }))
);

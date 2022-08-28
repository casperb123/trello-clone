import { createReducer, on } from '@ngrx/store';
import * as actions from './authentication.actions';

export interface State {
  loggingIn: boolean;
  loggedIn: boolean;
  loginError: any;
}

export const initialState: State = {
  loggedIn: false,
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
  on(actions.loginSuccess, (state) => ({
    ...state,
    loggedIn: true,
    loggingIn: false,
  })),
  on(actions.loginError, (state, action) => ({
    ...state,
    loggingIn: false,
    loginError: action.error,
  }))
);

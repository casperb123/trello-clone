import { createReducer, on } from '@ngrx/store';
import {
  User,
  UserData,
} from 'src/app/modules/authentication/utilities/authentication.models';
import * as actions from './authentication.actions';

export interface State {
  loading: boolean;
  userLoggedIn: User;
  error: string;
  userData: {
    loading: boolean;
    userData: UserData;
    error: any;
  };
}

export const initialState: State = {
  loading: false,
  userLoggedIn: null,
  error: null,
  userData: {
    loading: false,
    userData: null,
    error: null,
  },
};

export const authenticationReducer = createReducer(
  initialState,
  on(actions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(actions.loginSuccess, (state, action) => ({
    ...state,
    userLoggedIn: action.user,
    loading: false,
  })),
  on(actions.loginError, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(actions.loadUserData, (state) => ({
    ...state,
    userData: {
      ...state.userData,
      loading: true,
      error: null,
    },
  })),
  on(actions.loadUserDataSuccess, (state, action) => ({
    ...state,
    userData: {
      ...state.userData,
      userData: action.userData,
      loading: false,
    },
  })),
  on(actions.loadUserDataError, (state, action) => ({
    ...state,
    userData: {
      ...state.userData,
      loading: false,
      error: action.error,
    },
  })),
  on(actions.updateUserData, (state, action) => ({
    ...state,
    userData: {
      ...state.userData,
      userData: action.userData,
    },
  })),
  on(actions.logout, () => ({
    ...initialState,
  }))
);

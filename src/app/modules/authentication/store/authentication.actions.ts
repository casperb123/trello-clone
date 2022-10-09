import { createAction, props } from '@ngrx/store';
import {
  User,
  UserData,
} from 'src/app/modules/authentication/utilities/authentication.models';

export const login = createAction(
  '[Authentication] Login',
  props<{ email: string; password: string; rememberMe: boolean }>()
);

export const loginSuccess = createAction(
  '[Authentication] Login Success',
  props<{ user: User }>()
);

export const loginError = createAction(
  '[Authentication] Login Error',
  props<{ error: string }>()
);

export const loadUserData = createAction(
  '[Authentication] Get User Data',
  props<{ token: string }>()
);

export const loadUserDataSuccess = createAction(
  '[Authentication] Get User Data Success',
  props<{ userData: UserData }>()
);

export const loadUserDataError = createAction(
  '[Authentication] Get User Data Error',
  props<{ error: any }>()
);

export const updateUserData = createAction(
  '[Authentication] Update User Data',
  props<{ userData: UserData }>()
);

export const logout = createAction('[Authentication] Logout');

export const updateUser = createAction(
  '[Authentication] Update User',
  props<{ user: User }>()
);

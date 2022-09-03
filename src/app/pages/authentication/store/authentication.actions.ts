import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/pages/authentication/utilities/authentication.models';

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

export const logout = createAction('[Authentication] Logout');

export const updateUser = createAction(
  '[Authentication] Update User',
  props<{ user: User }>()
);

import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/pages/authentication/authentication.models';

export const login = createAction(
  '[Authentucation] Login',
  props<{ email: string; password: string }>()
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

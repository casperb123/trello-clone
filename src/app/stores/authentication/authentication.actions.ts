import { createAction, props } from '@ngrx/store';
import { AuthResponse } from 'src/app/pages/authentication/authentication.interfaces';

export const login = createAction(
  '[Authentucation] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Authentication] Login Success',
  props<{ response: AuthResponse }>()
);

export const loginError = createAction(
  '[Authentication] Login Error',
  props<{ error: string }>()
);

export const logout = createAction('[Authentication] Logout');

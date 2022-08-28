import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Authentucation] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction('[Authentication] Login Success');

export const loginError = createAction(
  '[Authentication] Login Error',
  props<{ error: any }>()
);

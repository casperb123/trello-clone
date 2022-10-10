import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
  User,
  UserData,
} from 'src/app/modules/authentication/utilities/authentication.models';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';
import { ApiEndpoint, ApiType } from 'src/app/utilities/app.enums';
import { Api } from 'src/app/utilities/app.service';
import {
  AuthLoginResponse,
  AuthUserDataResponse,
} from '../utilities/authentication.interfaces';
import * as actions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthenticationService,
    private api: Api
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      exhaustMap((action) =>
        this.http
          .post<AuthLoginResponse>(
            this.api.getApiUrl(ApiType.Auth, ApiEndpoint.AuthLogin),
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((response) => {
              const user = new User(
                response.localId,
                response.email,
                response.idToken,
                response.refreshToken,
                this.authService.handleExpireDate(response.expiresIn),
                action.rememberMe
              );

              return actions.loginSuccess({
                user: user,
              });
            }),
            catchError((errorResponse) =>
              of(
                actions.loginError({
                  error: this.authService.handleAuthError(errorResponse),
                })
              )
            )
          )
      )
    )
  );

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadUserData),
      exhaustMap((action) =>
        this.http
          .post<AuthUserDataResponse>(
            this.api.getApiUrl(ApiType.Auth, ApiEndpoint.AuthGetUserData),
            {
              idToken: action.token,
            }
          )
          .pipe(
            map((response) => {
              const userData = new UserData(
                response.users[0].displayName,
                response.users[0].emailVerified,
                response.users[0].photoUrl,
                response.users[0].passwordUpdatedAt
              );

              return actions.loadUserDataSuccess({ userData: userData });
            }),
            catchError((response) =>
              of(actions.loadUserDataError({ error: response }))
            )
          )
      )
    )
  );
}

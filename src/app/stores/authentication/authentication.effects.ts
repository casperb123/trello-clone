import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthResponse } from 'src/app/pages/authentication/authentication.interfaces';
import { User } from 'src/app/pages/authentication/authentication.models';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import * as actions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      exhaustMap((action) =>
        this.http
          .post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_UOHQ3neS57-J0Mx4BtaaL8MSxQPjdJA',
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((response) => {
              const expirationDate: Date = new Date(
                new Date().getTime() + +response.expiresIn * 1000
              );
              return actions.loginSuccess({
                user: new User(
                  response.email,
                  response.localId,
                  response.idToken,
                  expirationDate
                ),
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
}

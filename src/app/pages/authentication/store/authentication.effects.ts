import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthResponse } from 'src/app/pages/authentication/utilities/authentication.interfaces';
import { User } from 'src/app/pages/authentication/utilities/authentication.models';
import { AuthenticationService } from 'src/app/pages/authentication/utilities/authentication.service';
import * as boardActions from '../../boards/store/boards.actions';
import * as actions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router
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
              const user = new User(
                response.email,
                response.localId,
                response.idToken,
                this.authService.handleExpireDate(response.expiresIn)
              );
              localStorage.setItem('userData', JSON.stringify(user));

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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logout),
      map(() => {
        localStorage.removeItem('userData');
        this.router.navigate(['']);

        return boardActions.resetBoards();
      })
    )
  );
}

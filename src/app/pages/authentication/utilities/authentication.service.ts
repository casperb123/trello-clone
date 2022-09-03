import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationFacade } from '../store/authentication.facade';
import { AuthError } from './authentication.enums';
import {
  AuthResponse,
  RefreshTokenResponse,
  UserInterface,
} from './authentication.interfaces';
import { User } from './authentication.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private logoutTimer: any;

  constructor(
    private http: HttpClient,
    private authFacade: AuthenticationFacade,
    private snackBar: MatSnackBar
  ) {}

  public handleAuthError(error: HttpErrorResponse): string {
    let errorMessage = 'An unknown error occured!';
    if (error?.error?.error) {
      errorMessage = AuthError[error.error.error.message];
    }
    return errorMessage;
  }

  public handleExpireDate(expiresIn: string): Date {
    const expirationDate: Date = new Date(
      new Date().getTime() + +expiresIn * 1000
    );
    return expirationDate;
  }

  public register(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes: HttpErrorResponse) =>
          throwError(() => this.handleAuthError(errorRes))
        )
      );
  }

  public login(email: string, password: string, rememberMe: boolean): void {
    this.authFacade.login(email, password, rememberMe);
  }

  public loginSuccess(
    email: string,
    id: string,
    token: string,
    refreshToken: string,
    tokenExpiration: string,
    rememberMe: boolean
  ): void {
    this.authFacade.loginSuccess(
      new User(
        email,
        id,
        token,
        refreshToken,
        this.handleExpireDate(tokenExpiration),
        rememberMe
      )
    );
  }

  private refreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(
      `https://securetoken.googleapis.com/v1/token?key=${environment.firebaseApiKey}`,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }
    );
  }

  public autoLogin(): void {
    const userData: UserInterface = JSON.parse(
      localStorage.getItem('userData')
    );

    if (!userData) {
      return;
    }

    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      userData.refreshToken,
      new Date(userData.tokenExpirationDate),
      userData.rememberMe
    );

    if (user.token) {
      this.authFacade.autoLogin(user);
    } else if (user.rememberMe) {
      this.refreshToken(user.refreshToken)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.loginSuccess(
              user.email,
              user.id,
              response.id_token,
              response.refresh_token,
              response.expires_in,
              user.rememberMe
            );
          },
          error: () => {
            this.logout();
          },
        });
    }
  }

  public logout(): void {
    this.authFacade.logout();
  }

  public autoLogout(expiration: number): void {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expiration);
  }

  public getIsLoggingIn(): Observable<boolean> {
    return this.authFacade.getIsLoggingIn();
  }

  public getUserLoggedIn(): Observable<User> {
    return this.authFacade.getUserLoggedIn();
  }

  public getLoginError(): Observable<string> {
    return this.authFacade.getLoginError();
  }
}

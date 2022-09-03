import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationFacade } from '../store/authentication.facade';
import { AuthError } from './authentication.enums';
import { AuthResponse, UserInterface } from './authentication.interfaces';
import { User } from './authentication.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private authFacade: AuthenticationFacade
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_UOHQ3neS57-J0Mx4BtaaL8MSxQPjdJA',
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

  public login(email: string, password: string): void {
    this.authFacade.login(email, password);
  }

  public registerLogin(
    email: string,
    id: string,
    token: string,
    tokenExpiration: string
  ): void {
    this.authFacade.registerLogin(
      new User(email, id, token, this.handleExpireDate(tokenExpiration))
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
      new Date(userData._tokenExpirationDate)
    );

    if (user.token) {
      this.authFacade.autoLogin(user);
    }
  }

  public logout(): void {
    this.authFacade.logout();
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

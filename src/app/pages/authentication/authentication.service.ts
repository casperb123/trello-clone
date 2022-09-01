import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationFacade } from 'src/app/stores/authentication/authentication.facade';
import { AuthControlType, AuthError } from './authentication.enums';
import { AuthResponse } from './authentication.interfaces';
import { User } from './authentication.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private authFacade: AuthenticationFacade
  ) {}

  public getFormValidationError(
    control: AbstractControl,
    controlType: AuthControlType
  ): string {
    if (control.hasError('required')) {
      return `The ${controlType} can't be empty`;
    }

    if (control.hasError('minlength')) {
      return `The ${controlType} must be atleast 6 characters`;
    }

    if (control.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }

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

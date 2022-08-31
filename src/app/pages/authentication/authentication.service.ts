import { ComponentType } from '@angular/cdk/portal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationFacade } from 'src/app/stores/authentication/authentication.facade';
import {
  AuthControlType,
  AuthDialogType,
  AuthError,
} from './authentication.enums';
import { AuthResponse, User } from './authentication.interfaces';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authFacade: AuthenticationFacade
  ) {}

  public openDialog(dialogType: AuthDialogType): void {
    let component: ComponentType<any>;
    switch (dialogType) {
      case AuthDialogType.login:
        component = LoginDialogComponent;
        break;
      case AuthDialogType.register:
        component = RegisterDialogComponent;
        break;
      default:
        break;
    }

    this.dialog.open(component, {
      width: '450px',
    });
  }

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

  public logout(): void {
    this.authFacade.logout();
  }

  public getIsLoggingIn(): Observable<boolean> {
    return this.authFacade.getIsLoggingIn();
  }

  public getIsLoggedIn(): Observable<User> {
    return this.authFacade.getIsLoggedIn();
  }

  public getLoginError(): Observable<string> {
    return this.authFacade.getLoginError();
  }
}

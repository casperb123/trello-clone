import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  AuthControlType,
  AuthDialogType,
} from 'src/app/pages/authentication/authentication.enums';
import { AuthRegisterResponse } from 'src/app/pages/authentication/authentication.interfaces';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

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
      width: '400px',
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

  public register(
    email: string,
    password: string
  ): Observable<AuthRegisterResponse> {
    return this.http.post<AuthRegisterResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_UOHQ3neS57-J0Mx4BtaaL8MSxQPjdJA',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}

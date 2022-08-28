import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthControlType } from '../../authentication.enums';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public controlType = AuthControlType;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterDialogComponent>
  ) {}

  public openLoginDialog(): void {
    this.dialogRef.close();
    this.dialog.open(LoginDialogComponent, {
      width: '300px',
    });
  }

  public getErrorMessage(controlType: AuthControlType): string {
    switch (controlType) {
      case AuthControlType.Email:
        if (this.email.hasError('required')) {
          return 'You must enter an email';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
      case AuthControlType.Password:
        return this.password.hasError('required')
          ? 'You must enter a password'
          : '';
      default:
        return '';
    }
  }

  ngOnInit(): void {}
}

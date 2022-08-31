import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { AuthControlType, AuthDialogType } from '../../authentication.enums';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  private loggedInSub: Subscription;

  public form: FormGroup;
  public controlType = AuthControlType;
  public isLoggingIn$: Observable<boolean>;
  public isLoggedIn$: Observable<boolean>;
  public loginError$: Observable<string>;

  public get email(): AbstractControl {
    return this.form.get('email');
  }
  public get password(): AbstractControl {
    return this.form.get('password');
  }
  public get rememberMe(): AbstractControl {
    return this.form.get('rememberMe');
  }

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rememberMe: new FormControl(false),
    });

    this.isLoggingIn$ = this.authService.getIsLoggingIn().pipe(
      tap((isLoggingIn) => {
        this.dialogRef.disableClose = isLoggingIn;
      })
    );
    this.loginError$ = this.authService.getLoginError();

    this.loggedInSub = this.authService
      .getIsLoggedIn()
      .pipe(filter((isLoggedIn) => !!isLoggedIn))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  public openRegisterDialog(): void {
    this.dialogRef.close();
    this.authService.openDialog(AuthDialogType.register);
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.authService.login(this.email.value, this.password.value);
  }

  ngOnDestroy(): void {
    if (this.loggedInSub) {
      this.loggedInSub.unsubscribe();
    }
  }
}

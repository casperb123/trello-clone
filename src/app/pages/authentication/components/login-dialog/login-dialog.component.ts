import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { ControlType, DialogType } from 'src/app/app.enums';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from '../../utilities/authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  private loggedInSub: Subscription;

  public form: FormGroup;
  public controlType = ControlType;
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
    public appService: AppService,
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
      .getUserLoggedIn()
      .pipe(filter((user) => !!user))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  public openRegisterDialog(): void {
    this.dialogRef.close();
    this.appService.openDialog(DialogType.Register);
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.authService.login(
      this.email.value,
      this.password.value,
      this.rememberMe.value
    );
  }

  ngOnDestroy(): void {
    if (this.loggedInSub) {
      this.loggedInSub.unsubscribe();
    }
  }
}

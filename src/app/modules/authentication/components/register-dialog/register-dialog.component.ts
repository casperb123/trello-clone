import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, Subscription } from 'rxjs';
import { ControlType, DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { AuthenticationService } from '../../utilities/authentication.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
  private subs: Subscription[];

  public form: FormGroup;
  public controlType = ControlType;
  public isLoading: boolean;
  public errorMessage: string;

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
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
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
    this.subs = [];

    this.subs.push(
      this.authService
        .getUserLoggedIn()
        .pipe(filter((user) => !!user))
        .subscribe(() => {
          this.dialogRef.close();
        })
    );
    this.subs.push(
      this.authService.getLoginError().subscribe((error) => {
        this.isLoading = false;
        this.errorMessage = error;
      })
    );
  }

  public openLoginDialog(): void {
    this.dialogRef.close();
    this.appService.openDialog(DialogType.Login);
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.subs.push(
      this.authService
        .register(this.email.value, this.password.value)
        .subscribe({
          next: (response) => {
            this.authService.loginSuccess(
              response.email,
              response.localId,
              response.idToken,
              response.refreshToken,
              response.expiresIn,
              this.rememberMe.value
            );
          },
          error: (error: string) => {
            this.errorMessage = error;
            this.isLoading = false;
          },
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }
}

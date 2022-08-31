import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, Subscription } from 'rxjs';
import { AuthControlType, AuthDialogType } from '../../authentication.enums';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
  private subs: Subscription[];

  public form: FormGroup;
  public controlType = AuthControlType;
  public isLoading: boolean;
  public errorMessage: string;

  public get email(): AbstractControl {
    return this.form.get('email');
  }

  public get password(): AbstractControl {
    return this.form.get('password');
  }

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
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
    this.authService.openDialog(AuthDialogType.login);
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
            this.authService.registerLogin(
              response.email,
              response.localId,
              response.idToken,
              response.expiresIn
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

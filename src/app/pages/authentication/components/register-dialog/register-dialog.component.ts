import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthControlType, AuthDialogType } from '../../authentication.enums';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
  private registerSubscription: Subscription;

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

    this.registerSubscription = this.authService
      .register(this.email.value, this.password.value)
      .subscribe({
        next: (response) => {
          console.log('Register response', response);
          this.isLoading = false;
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}

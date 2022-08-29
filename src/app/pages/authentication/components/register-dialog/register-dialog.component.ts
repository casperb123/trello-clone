import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
    });
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
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

    this.registerSubscription = this.authService
      .register(this.email.value, this.password.value)
      .subscribe({
        next: (response) => {
          console.log('Register response', response);
        },
        error: (error: HttpErrorResponse) => {
          console.log('Register error', error);
        },
        complete: () => (this.isLoading = false),
      });
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}

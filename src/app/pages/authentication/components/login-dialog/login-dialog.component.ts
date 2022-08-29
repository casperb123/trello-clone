import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthControlType, AuthDialogType } from '../../authentication.enums';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  public form: FormGroup;
  public controlType = AuthControlType;

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
    });
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  public openRegisterDialog(): void {
    this.dialogRef.close();
    this.authService.openDialog(AuthDialogType.register);
  }

  public onSubmit(form: NgForm): void {
    console.log(form.value);
  }
}

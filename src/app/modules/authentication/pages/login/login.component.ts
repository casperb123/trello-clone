import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { AuthenticationService } from '../../utilities/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public controlType = ControlType;
  public isLoggingIn$: Observable<boolean>;
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
    private authService: AuthenticationService,
    public appService: AppService
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

    this.isLoggingIn$ = this.authService.getIsLoggingIn();
    this.loginError$ = this.authService.getLoginError();
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
}

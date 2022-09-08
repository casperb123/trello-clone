import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ControlType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { AuthenticationService } from '../../utilities/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private registerSub: Subscription;

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
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.registerSub = this.authService
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
      });
  }

  ngOnDestroy(): void {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }
}

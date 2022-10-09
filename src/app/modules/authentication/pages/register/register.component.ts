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
  public get displayName(): AbstractControl {
    return this.form.get('displayName');
  }
  public get password(): AbstractControl {
    return this.form.get('password');
  }

  constructor(
    private authService: AuthenticationService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      displayName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.registerSub = this.authService
      .register(this.email.value, this.displayName.value, this.password.value)
      .subscribe({
        next: (response) => {
          console.log('register response', response);
          this.authService.loginSuccess(
            response.localId,
            response.email,
            response.idToken,
            response.refreshToken,
            response.expiresIn,
            false
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

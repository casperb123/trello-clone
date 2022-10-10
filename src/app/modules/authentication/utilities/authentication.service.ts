import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  combineLatestWith,
  filter,
  map,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { ApiEndpoint, ApiType } from 'src/app/utilities/app.enums';
import { Api } from 'src/app/utilities/app.service';
import { AuthenticationFacade } from '../store/authentication.facade';
import { AuthError } from './authentication.enums';
import {
  AuthRefreshTokenResponse,
  AuthRegisterResponse,
  AuthUpdateUserDataResponse,
  AuthUser,
} from './authentication.interfaces';
import { User, UserData } from './authentication.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private authFacade: AuthenticationFacade,
    private router: Router,
    private api: Api
  ) {}

  public handleAuthError(error: HttpErrorResponse): string {
    let errorMessage = 'An unknown error occured!';
    if (error?.error?.error) {
      errorMessage = AuthError[error.error.error.message];
    }
    return errorMessage;
  }

  public handleExpireDate(expiresIn: string): Date {
    const expirationDate: Date = new Date(
      new Date().getTime() + +expiresIn * 1000
    );
    return expirationDate;
  }

  public register(
    email: string,
    displayName: string,
    password: string
  ): Observable<AuthRegisterResponse> {
    return this.http
      .post<AuthRegisterResponse>(
        this.api.getApiUrl(ApiType.Auth, ApiEndpoint.AuthRegister),
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        switchMap((response) =>
          of(response).pipe(
            combineLatestWith(
              this.updateUserData(response.idToken, new UserData(displayName))
            )
          )
        ),
        map(([user, userData]) => {
          return <AuthRegisterResponse>{
            ...user,
            userData: userData,
          };
        }),
        catchError((errorRes: HttpErrorResponse) =>
          throwError(() => this.handleAuthError(errorRes))
        )
      );
  }

  public login(email: string, password: string, rememberMe: boolean): void {
    this.authFacade.login(email, password, rememberMe);
  }

  public loginSuccess(
    id: string,
    email: string,
    token: string,
    refreshToken: string,
    tokenExpiration: string,
    rememberMe: boolean
  ): void {
    this.authFacade.loginSuccess(
      new User(
        id,
        email,
        token,
        refreshToken,
        this.handleExpireDate(tokenExpiration),
        rememberMe
      )
    );
  }

  private refreshToken(
    refreshToken: string
  ): Observable<AuthRefreshTokenResponse> {
    return this.http.post<AuthRefreshTokenResponse>(
      this.api.getApiUrl(ApiType.Auth, ApiEndpoint.AuthRefreshToken),
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }
    );
  }

  public autoLogin(): void {
    const userData: AuthUser = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      userData.refreshToken,
      new Date(userData.tokenExpirationDate),
      userData.rememberMe
    );

    if (user.token) {
      this.authFacade.autoLogin(user);
    } else if (user.rememberMe) {
      this.refreshToken(user.refreshToken)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.loginSuccess(
              user.email,
              user.id,
              response.id_token,
              response.refresh_token,
              response.expires_in,
              user.rememberMe
            );
          },
          error: () => {
            this.logout();
          },
        });
    }
  }

  public getUserData(token: string): Observable<UserData> {
    return this.authFacade.getUserData(token);
  }

  public updateUserData(
    token: string,
    userData: UserData
  ): Observable<UserData> {
    return this.http
      .post<AuthUpdateUserDataResponse>(
        this.api.getApiUrl(ApiType.Auth, ApiEndpoint.AuthUpdateUserData),
        {
          idToken: token,
          displayName: userData.displayName,
          returnSecureToken: false,
        }
      )
      .pipe(
        map((response) => {
          const newUserData = new UserData(
            response.displayName,
            userData.emailVerified,
            response.photoUrl,
            userData.passwordUpdatedAt
          );

          this.authFacade.updateUserData(newUserData);

          return newUserData;
        })
      );
  }

  public logout(): void {
    this.authFacade.logout();
    this.getUserLoggedIn()
      .pipe(
        filter((user) => !user),
        take(1)
      )
      .subscribe(() => {
        localStorage.removeItem('userData');
        this.router.navigate(['/home']);
      });
  }

  public getIsLoggingIn(): Observable<boolean> {
    return this.authFacade.getIsLoggingIn();
  }

  public getUserLoggedIn(): Observable<User> {
    return this.authFacade.getUserLoggedIn();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.getUserLoggedIn().pipe(map((user) => !!user && !!user.token));
    // return this.getUserLoggedIn().pipe(
    //   switchMap((user) => {
    //     if (!!user && !!user.token) {
    //       return of(true);
    //     }
    //     console.log('user', user);

    //     this.autoLogin();
    //     return this.authFacade.getAuthState().pipe(
    //       distinctUntilChanged(),
    //       map((state) => {
    //         console.log('Auth state:', state);
    //         if (!!state.userLoggedIn && !!state.userLoggedIn.token) {
    //           return true;
    //         }

    //         return false;
    //       })
    //     );
    //   })
    // );
  }

  public getLoginError(): Observable<string> {
    return this.authFacade.getLoginError();
  }
}

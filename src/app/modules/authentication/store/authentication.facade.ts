import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap, tap } from 'rxjs';
import {
  User,
  UserData,
} from 'src/app/modules/authentication/utilities/authentication.models';
import * as actions from './authentication.actions';
import { State } from './authentication.reducer';
import * as selectors from './authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationFacade {
  constructor(private store$: Store<State>, private router: Router) {}

  public getAuthState(): Observable<State> {
    return this.store$.select(selectors.selectAuthenticationState);
  }

  public login(email: string, password: string, rememberMe: boolean): void {
    this.store$.dispatch(
      actions.login({
        email: email,
        password: password,
        rememberMe: rememberMe,
      })
    );
  }

  public autoLogin(user: User): void {
    this.store$.dispatch(actions.loginSuccess({ user: user }));
  }

  public loginSuccess(user: User): void {
    this.store$.dispatch(actions.loginSuccess({ user: user }));
    this.router.navigate(['/workspaces']);
  }

  public getUserData(token: string): Observable<UserData> {
    return this.getAuthState().pipe(
      filter(
        (state) => state && !!state.userLoggedIn && !!state.userLoggedIn.token
      ),
      tap((state) => {
        if (
          state &&
          !state.userData.loading &&
          !state.userData.userData &&
          !state.userData.error
        ) {
          this.store$.dispatch(actions.loadUserData({ token: token }));
        }
      }),
      filter((state) => !!state.userData.userData && !state.userData.loading),
      switchMap(() => this.store$.select(selectors.getUserData))
    );
  }

  public updateUserData(userData: UserData): void {
    this.store$.dispatch(actions.updateUserData({ userData: userData }));
  }

  public logout(): void {
    this.store$.dispatch(actions.logout());
  }

  public getIsLoggingIn(): Observable<boolean> {
    return this.store$.select(selectors.getIsLoggingIn);
  }

  public getUserLoggedIn(): Observable<User> {
    return this.store$.select(selectors.getUserLoggedIn);
  }

  public getLoginError(): Observable<string> {
    return this.store$.select(selectors.getLoginError);
  }
}

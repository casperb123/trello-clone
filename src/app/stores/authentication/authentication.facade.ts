import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/pages/authentication/authentication.interfaces';
import * as actions from './authentication.actions';
import { State } from './authentication.reducer';
import * as selectors from './authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationFacade {
  constructor(private store$: Store<State>) {}

  public login(email: string, password: string): void {
    this.store$.dispatch(actions.login({ email: email, password: password }));
  }

  public logout(): void {
    this.store$.dispatch(actions.logout());
  }

  public getIsLoggingIn(): Observable<boolean> {
    return this.store$.select(selectors.getLoggingInState);
  }

  public getIsLoggedIn(): Observable<User> {
    return this.store$.select(selectors.getLoggedInState);
  }

  public getLoginError(): Observable<string> {
    return this.store$.select(selectors.getLoginError);
  }
}

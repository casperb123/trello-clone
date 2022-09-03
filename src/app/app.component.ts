import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { AuthenticationService } from './pages/authentication/utilities/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private loggedInSub: Subscription;

  public title = 'trello-clone';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggedInSub = this.authService
      .getUserLoggedIn()
      .pipe(filter((user) => !!user && !!user.token))
      .subscribe((user) => {
        const tokenExpire =
          new Date(user.tokenExpirationDate).getTime() - new Date().getTime();

        localStorage.setItem('userData', JSON.stringify(user));
        this.authService.autoLogout(tokenExpire);
      });
  }

  ngOnDestroy(): void {
    if (this.loggedInSub) {
      this.loggedInSub.unsubscribe();
    }
  }
}

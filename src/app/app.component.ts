import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthenticationService } from './modules/authentication/utilities/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private loggedInSub: Subscription;
  private readonly darkClassName = 'dark-theme';

  public title = 'trello-clone';

  @HostBinding('class') className = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggedInSub = this.authService
      .getUserLoggedIn()
      .pipe(filter((user) => !!user && !!user.token))
      .subscribe((user) => {
        if (user.rememberMe) {
          localStorage.setItem('userData', JSON.stringify(user));
        }

        this.router.navigate(['/workspaces']);
      });
  }

  ngOnDestroy(): void {
    if (this.loggedInSub) {
      this.loggedInSub.unsubscribe();
    }
  }

  public toggleDarkMode(enabled: boolean): void {
    this.className = enabled ? this.darkClassName : '';
    this.overlay.getContainerElement().classList.toggle(this.darkClassName);
    localStorage.setItem('darkMode', `${enabled}`);
  }
}

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
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
  private readonly htmlClassList = document.documentElement.classList;

  public title = 'trello-clone';
  public darkMode: boolean;

  @ViewChild('drawer')
  public drawer: MatDrawer;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    const darkMode: boolean = JSON.parse(localStorage.getItem('darkMode'));
    this.toggleDarkMode(darkMode);

    this.authService.autoLogin();
    this.loggedInSub = this.authService
      .getUserLoggedIn()
      .pipe(filter((user) => !!user && !!user.token))
      .subscribe((user) => {
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/workspaces']);
      });
  }

  ngOnDestroy(): void {
    if (this.loggedInSub) {
      this.loggedInSub.unsubscribe();
    }
  }

  public toggleDarkMode(enabled: boolean): void {
    const containerClassList = this.overlay.getContainerElement().classList;

    if (enabled) {
      containerClassList.add(this.darkClassName);
      this.htmlClassList.add(this.darkClassName);
    } else {
      containerClassList.remove(this.darkClassName);
      this.htmlClassList.remove(this.darkClassName);
    }

    localStorage.setItem('darkMode', `${enabled}`);
  }

  public openDrawer(): void {
    if (
      window.innerWidth <= 500 &&
      !this.htmlClassList.contains('cdk-global-scrollblock')
    ) {
      this.htmlClassList.add('cdk-global-scrollblock');
    }

    this.drawer.open();
  }

  public closeDrawer(): void {
    if (window.innerWidth <= 500) {
      this.htmlClassList.remove('cdk-global-scrollblock');
    }

    this.drawer.close();
  }
}

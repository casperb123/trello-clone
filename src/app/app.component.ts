import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './modules/authentication/utilities/authentication.service';
import { WorkspaceService } from './modules/workspace/utilities/workspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private loggedInSub: Subscription;
  private readonly darkClassName = 'dark-theme';
  private readonly bodyClassList = document.body.classList;
  private readonly htmlElement = document.documentElement;
  private loggedIn: boolean;
  private scrollTop: number;

  public title = 'trello-clone';
  public darkMode: boolean;
  public navigationOpen: boolean;

  constructor(
    private authService: AuthenticationService,
    private workspaceService: WorkspaceService,
    private router: Router,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    const darkMode: boolean = JSON.parse(localStorage.getItem('darkMode'));
    this.toggleDarkMode(darkMode);

    this.authService.autoLogin();
    this.loggedInSub = this.authService.getUserLoggedIn().subscribe((user) => {
      if (!!user && !!user.token) {
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/workspaces']);
        this.loggedIn = true;
      } else if (this.loggedIn) {
        this.workspaceService.unloadWorkspaces();
      }
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
      this.bodyClassList.add(this.darkClassName);
    } else {
      containerClassList.remove(this.darkClassName);
      this.bodyClassList.remove(this.darkClassName);
    }

    localStorage.setItem('darkMode', `${enabled}`);
  }

  public toggleNavigation(open: boolean): void {
    this.navigationOpen = open;

    if (window.innerWidth <= 500) {
      if (open) {
        this.scrollTop = this.htmlElement.scrollTop;

        if (!this.htmlElement.classList.contains('scrollblock')) {
          this.htmlElement.classList.add('scrollblock');
          this.htmlElement.style.top = `-${this.scrollTop}px`;
        }
      } else {
        this.htmlElement.classList.remove('scrollblock');
        this.htmlElement.style.top = null;
        this.htmlElement.scrollTo({ top: this.scrollTop });
      }
    }
  }
}

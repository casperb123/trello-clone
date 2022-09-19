import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;

  public isLoggedIn$: Observable<boolean>;

  @Input()
  public navigationOpen: boolean;

  @Output()
  public navigationToggle: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService
      .getUserLoggedIn()
      .pipe(map((user) => !!user && !!user.token));

    this.routerSub = this.router.events
      .pipe(
        filter(
          (event) => event instanceof NavigationEnd && window.innerWidth <= 500
        )
      )
      .subscribe(() => {
        this.closeNavigation();
      });
  }

  public openNavigation(): void {
    this.navigationToggle.emit(true);
  }

  public closeNavigation(): void {
    this.navigationToggle.emit(false);
  }

  public logout(): void {
    this.authService.logout();

    if (window.innerWidth <= 500) {
      this.closeNavigation();
    }
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}

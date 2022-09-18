import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public navigationOpen: boolean;
  public isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService
      .getUserLoggedIn()
      .pipe(map((user) => !!user && !!user.token));
  }

  public toggleNavigation(): void {
    this.navigationOpen = !this.navigationOpen;
  }

  public openNavigation(): void {
    this.navigationOpen = true;
  }

  public closeNavigation(): void {
    this.navigationOpen = false;
  }

  public logout(): void {
    this.authService.logout();
  }
}

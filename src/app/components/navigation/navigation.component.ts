import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDialogType } from 'src/app/pages/authentication/authentication.enums';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public dialogType = AuthDialogType;
  public isLoggedIn$: Observable<boolean>;

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getIsLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
  }
}

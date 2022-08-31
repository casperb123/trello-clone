import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDialogType } from 'src/app/pages/authentication/authentication.enums';
import { User } from 'src/app/pages/authentication/authentication.models';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public dialogType = AuthDialogType;
  public isLoggedIn$: Observable<User>;

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getUserLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
  }
}

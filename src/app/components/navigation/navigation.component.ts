import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogType } from 'src/app/app.enums';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/pages/authentication/utilities/authentication.models';
import { AuthenticationService } from 'src/app/pages/authentication/utilities/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public dialogType = DialogType;
  public isLoggedIn$: Observable<User>;

  constructor(
    public authService: AuthenticationService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getUserLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
  }
}

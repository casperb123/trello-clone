import { Component } from '@angular/core';
import { AuthDialogType } from 'src/app/pages/authentication/authentication.enums';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public dialogType = AuthDialogType;

  constructor(public authService: AuthenticationService) {}
}

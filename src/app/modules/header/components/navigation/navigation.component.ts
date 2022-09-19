import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;

  @Input()
  public navigationOpen: boolean;

  @Output()
  public navigationToggle: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService
      .getUserLoggedIn()
      .pipe(map((user) => !!user && !!user.token));
  }

  public openNavigation(): void {
    this.navigationToggle.emit(true);
  }

  public closeNavigation(): void {
    this.navigationToggle.emit(false);
  }

  public logout(): void {
    this.authService.logout();
  }
}

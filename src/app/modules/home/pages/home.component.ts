import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserData } from '../../authentication/utilities/authentication.models';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private isLoggedInSub: Subscription;

  public isLoggedIn: boolean;
  public userData$: Observable<UserData>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedInSub = this.authService
      .getUserLoggedIn()
      .subscribe((user) => {
        if (!user || !user.token) {
          this.isLoggedIn = false;
          return;
        }

        this.isLoggedIn = true;
        this.userData$ = this.authService.getUserData(user.token);
      });
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSub) {
      this.isLoggedInSub.unsubscribe();
    }
  }
}

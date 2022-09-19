import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/modules/authentication/utilities/authentication.models';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private darkModeToggleSub: Subscription;

  public user$: Observable<User>;
  public darkModeToggle: FormControl;

  @Input()
  public navigationOpen: boolean;

  @Output()
  public darkMode: EventEmitter<boolean> = new EventEmitter();
  @Output()
  public navigationToggle: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    const darkMode: boolean = JSON.parse(localStorage.getItem('darkMode'));

    this.user$ = this.authService.getUserLoggedIn();
    this.darkModeToggle = new FormControl(darkMode);

    this.darkModeToggleSub = this.darkModeToggle.valueChanges.subscribe(
      (enabled: boolean) => {
        this.darkMode.emit(enabled);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.darkModeToggleSub) {
      this.darkModeToggleSub.unsubscribe();
    }
  }

  public toggleNavigation(open: boolean = !this.navigationOpen): void {
    this.navigationToggle.emit(open);
  }
}

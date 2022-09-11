import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/modules/authentication/utilities/authentication.models';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';
import { Workspace } from 'src/app/modules/workspace/utilities/workspace.models';
import { WorkspaceService } from 'src/app/modules/workspace/utilities/workspace.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private darkModeToggleSub: Subscription;

  public user$: Observable<User>;
  public workspaces$: Observable<Workspace[]>;
  public darkModeToggle: FormControl;

  @Input()
  public drawer: MatDrawer;

  @Output()
  public sideNavClose: EventEmitter<void> = new EventEmitter();
  @Output()
  public darkMode: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private workspaceService: WorkspaceService
  ) {}

  ngOnInit(): void {
    const darkMode: boolean = JSON.parse(localStorage.getItem('darkMode'));

    this.user$ = this.authService.getUserLoggedIn();
    this.workspaces$ = this.workspaceService.getWorkspaces();
    this.darkModeToggle = new FormControl(darkMode);

    this.darkModeToggleSub = this.darkModeToggle.valueChanges.subscribe(
      (enabled: boolean) => {
        this.darkMode.emit(enabled);
      }
    );
  }

  public closeSideNav(): void {
    this.sideNavClose.emit();
  }

  public closeDrawer(): void {
    if (window.innerWidth <= 500) {
      this.drawer.close();
    }
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.darkModeToggleSub) {
      this.darkModeToggleSub.unsubscribe();
    }
  }
}

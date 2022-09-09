import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/modules/authentication/utilities/authentication.models';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';
import { Workspace } from 'src/app/modules/workspace/utilities/workspace.models';
import { WorkspaceService } from 'src/app/modules/workspace/utilities/workspace.service';
import { DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private toggleControlSub: Subscription;

  public dialogType = DialogType;
  public user$: Observable<User>;
  public workspaces$: Observable<Workspace[]>;
  public toggleControl: FormControl;

  @Output()
  public darkMode: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private workspaceService: WorkspaceService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUserLoggedIn();
    this.workspaces$ = this.workspaceService.getWorkspaces();
    this.toggleControl = new FormControl(false);

    this.toggleControl.valueChanges.subscribe((checked: boolean) => {
      this.darkMode.emit(checked);
    });

    const darkMode: boolean = JSON.parse(localStorage.getItem('darkMode'));
    this.toggleControl.setValue(darkMode);
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.toggleControlSub) {
      this.toggleControlSub.unsubscribe();
    }
  }
}

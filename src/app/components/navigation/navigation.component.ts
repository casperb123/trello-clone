import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/authentication/utilities/authentication.models';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';
import { WorkspacesService } from 'src/app/modules/workspaces/utilities/workspaces.service';
import { Workspace } from 'src/app/modules/workspaces/workspace/utilities/workspace.models';
import { DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public dialogType = DialogType;
  public user$: Observable<User>;
  public workspaces$: Observable<Workspace[]>;

  constructor(
    private authService: AuthenticationService,
    private workspacesService: WorkspacesService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUserLoggedIn();
    this.workspaces$ = this.workspacesService.getWorkspaces();
  }

  public logout(): void {
    this.authService.logout();
  }
}

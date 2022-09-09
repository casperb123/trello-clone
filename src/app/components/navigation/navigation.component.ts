import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/authentication/utilities/authentication.models';
import { AuthenticationService } from 'src/app/modules/authentication/utilities/authentication.service';
import { Workspace } from 'src/app/modules/workspace/utilities/workspace.models';
import { WorkspaceService } from 'src/app/modules/workspace/utilities/workspace.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public user$: Observable<User>;
  public workspaces$: Observable<Workspace[]>;

  constructor(
    private authService: AuthenticationService,
    private workspaceService: WorkspaceService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUserLoggedIn();
    this.workspaces$ = this.workspaceService.getWorkspaces();
  }

  public logout(): void {
    this.authService.logout();
  }
}

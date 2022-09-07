import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { Workspace } from '../../utilities/workspace.models';
import { WorkspaceService } from '../../utilities/workspace.service';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss'],
})
export class WorkspacesComponent implements OnInit {
  public workspaces$: Observable<Workspace[]>;
  public dialogType = DialogType;

  constructor(
    private workspaceService: WorkspaceService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.workspaces$ = this.workspaceService.getWorkspaces();
  }

  public openCreateWorkspaceDialog(): void {
    this.appService.openDialog(DialogType.CreateWorkspace);
  }
}

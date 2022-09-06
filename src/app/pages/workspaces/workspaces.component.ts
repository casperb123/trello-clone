import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { WorkspacesService } from './utilities/workspaces.service';
import { Workspace } from './workspace/utilities/workspace.models';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss'],
})
export class WorkspacesComponent implements OnInit {
  public workspaces$: Observable<Workspace[]>;
  public dialogType = DialogType;

  constructor(
    private workspacesService: WorkspacesService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.workspaces$ = this.workspacesService.getWorkspaces();
  }

  public openCreateWorkspaceDialog(): void {
    this.appService.openDialog(DialogType.CreateWorkspace);
  }
}

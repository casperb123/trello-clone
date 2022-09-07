import { Component, Input } from '@angular/core';
import { DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { Workspace } from '../workspaces/workspace/utilities/workspace.models';
import { Color } from './board/utilities/board.enums';
import { Board } from './board/utilities/board.models';
import { BoardsService } from './utilities/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  public dialogType = DialogType;

  @Input()
  public workspace: Workspace;

  constructor(
    private boardsService: BoardsService,
    public appService: AppService
  ) {}

  public openCreateBoardDialog(): void {
    this.appService.openDialog(DialogType.CreateBoard, {
      workspace: this.workspace,
    });
  }

  public getColor(board: Board): string {
    return Color[board.backgroundColor];
  }
}

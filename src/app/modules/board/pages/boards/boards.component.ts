import { Component, Input } from '@angular/core';
import { Workspace } from 'src/app/modules/workspace/utilities/workspace.models';
import { DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { Color } from '../../utilities/board.enums';
import { Board } from '../../utilities/board.models';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  public dialogType = DialogType;

  @Input()
  public workspace: Workspace;

  constructor(public appService: AppService) {}

  public openCreateBoardDialog(): void {
    this.appService.openDialog(DialogType.CreateBoard, {
      workspace: this.workspace,
    });
  }

  public getColor(board: Board): string {
    return Color[board.backgroundColor];
  }
}

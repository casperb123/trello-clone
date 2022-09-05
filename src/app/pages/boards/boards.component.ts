import { Component, Input } from '@angular/core';
import { DialogType } from 'src/app/utilities/app.enums';
import { AppService } from 'src/app/utilities/app.service';
import { Board } from './board/utilities/board.interfaces';
import { BoardsService } from './utilities/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  public dialogType = DialogType;

  @Input()
  public boards: Board[];

  constructor(
    private boardsService: BoardsService,
    public appService: AppService
  ) {}
}

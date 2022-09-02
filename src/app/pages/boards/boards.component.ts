import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogType } from 'src/app/app.enums';
import { AppService } from 'src/app/app.service';
import { Board } from './utilities/boards.models';
import { BoardsService } from './utilities/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public boards$: Observable<Board[]>;
  public dialogType = DialogType;

  constructor(
    private boardsService: BoardsService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.boards$ = this.boardsService.getBoards();
  }
}

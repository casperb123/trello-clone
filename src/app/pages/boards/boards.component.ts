import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardsFacade } from 'src/app/stores/boards/boards.facade';
import { Board } from './board/board.interface';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public boards$: Observable<Board[]>;

  constructor(private boardsFacade: BoardsFacade) {}

  ngOnInit(): void {
    this.boards$ = this.boardsFacade.getBoards();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from './board/board.interface';
import { BoardsService } from './boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public boards$: Observable<Board[]>;

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boards$ = this.boardsService.getBoards();
  }
}

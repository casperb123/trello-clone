import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoardsFacade } from '../store/boards.facade';
import { Board } from '../utilities/boards.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private boardSub: Subscription;
  public board: Board;

  constructor(
    private route: ActivatedRoute,
    private boardsFacade: BoardsFacade
  ) {}

  ngOnInit(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
    this.boardSub = this.boardsFacade
      .getBoardById(boardId)
      .subscribe((board) => (this.board = board));
  }

  ngOnDestroy(): void {
    if (this.boardSub) {
      this.boardSub.unsubscribe();
    }
  }
}

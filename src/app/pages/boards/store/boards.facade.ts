import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../interfaces/board';
import { BoardsState } from '../interfaces/boards-state';
import * as actions from './boards.actions';
import * as selectors from './boards.selectors';

@Injectable({ providedIn: 'root' })
export class BoardsFacade {
  constructor(private store$: Store<BoardsState>) {}

  public getBoards(): Observable<Board[]> {
    return this.store$.select(selectors.selectBoards);
  }

  public getBoardById(boardId: string): Observable<Board> {
    return this.store$.select(selectors.selectBoardById(boardId));
  }

  public saveBoards(boards: Board[]): void {
    this.store$.dispatch(actions.saveBoards({ boards: boards }));
  }

  public createBoard(board: Board): void {
    this.store$.dispatch(actions.createBoard({ board: board }));
  }

  public deleteBoard(board: Board): void {
    this.store$.dispatch(actions.deleteBoard({ boardId: board.id }));
  }
}

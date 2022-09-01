import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardsFacade } from 'src/app/stores/boards/boards.facade';
import { Board } from './board/board.interface';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  constructor(private boardsFacade: BoardsFacade) {}

  public getBoards(): Observable<Board[]> {
    return this.boardsFacade.getBoards();
  }

  public getBoardById(boardId: string): Observable<Board> {
    return this.boardsFacade.getBoardById(boardId);
  }

  public createBoard(title: string): void {
    this.boardsFacade.createBoard(title);
  }

  public deleteBoard(boardId: string): void {
    this.boardsFacade.deleteBoard(boardId);
  }
}

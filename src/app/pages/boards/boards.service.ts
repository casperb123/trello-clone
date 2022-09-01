import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardsFacade } from 'src/app/stores/boards/boards.facade';
import { Board } from './board/board.interface';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  constructor(private boardsFacade: BoardsFacade) {}

  public getIsLoading(): Observable<boolean> {
    return this.boardsFacade.getIsLoading();
  }

  public getIsLoaded(): Observable<boolean> {
    return this.boardsFacade.getIsLoaded();
  }

  public getLoadingError(): Observable<any> {
    return this.boardsFacade.getLoadingError();
  }

  public getCreateIsLoading(): Observable<boolean> {
    return this.boardsFacade.getCreateIsLoading();
  }

  public getCreateIsLoaded(): Observable<boolean> {
    return this.boardsFacade.getCreateIsLoaded();
  }

  public getCreateLoadingError(): Observable<any> {
    return this.boardsFacade.getCreateLoadingError();
  }

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

  public resetCreateState(): void {
    this.boardsFacade.resetCreateState();
  }
}

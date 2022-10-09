import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, Observable } from 'rxjs';
import { CreateResponse } from 'src/app/utilities/app.interfaces';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { BoardFacade } from '../store/board.facade';
import { Board } from './board.models';

@Injectable({ providedIn: 'root' })
export class BoardService {
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private boardFacade: BoardFacade
  ) {}

  public getIsLoading(): Observable<boolean> {
    return this.boardFacade.getIsLoading();
  }

  public getIsLoaded(): Observable<boolean> {
    return this.boardFacade.getIsLoaded();
  }

  public getLoadingError(): Observable<any> {
    return this.boardFacade.getLoadingError();
  }

  public getBoards(): Observable<Board[]> {
    return this.authService.getUserLoggedIn().pipe(
      filter((user) => !!user && !!user.token),
      exhaustMap(() => this.boardFacade.getBoards())
    );
  }

  public getBoardById(boardId: string): Observable<Board> {
    return this.getBoards().pipe(
      map((boards) => boards.find((board) => board.id === boardId))
    );
  }

  public getBoardsInWorkspace(workspaceId: string): Observable<Board[]> {
    return this.getBoards().pipe(
      map((boards) =>
        boards.filter((board) => board.workspaceId === workspaceId)
      )
    );
  }

  public createBoard(
    workspaceId: string,
    title: string,
    backgroundColor: string
  ): Observable<Board> {
    return this.authService.getUserLoggedIn().pipe(
      filter((user) => !!user && !!user.token),
      exhaustMap((user) =>
        this.http
          .post<CreateResponse>(
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/boards.json`,
            {
              workspaceId: workspaceId,
              title: title,
              backgroundColor: backgroundColor,
            }
          )
          .pipe(
            map((response) => {
              const board = new Board(
                response.name,
                workspaceId,
                title,
                backgroundColor
              );
              this.boardFacade.addBoard(board);

              return board;
            })
          )
      )
    );
  }

  public updateBoard(board: Board): void {
    this.boardFacade.updateBoard(board);
  }

  public deleteBoard(boardId: string): void {
    this.boardFacade.deleteBoard(boardId);
  }

  public unloadBoards(): void {
    this.boardFacade.unloadBoards();
  }
}

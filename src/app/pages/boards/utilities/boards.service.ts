import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, Observable } from 'rxjs';
import { CreateResponse } from 'src/app/utilities/app.interfaces';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { WorkspacesService } from '../../workspaces/utilities/workspaces.service';
import { Color } from '../board/utilities/board.enums';
import { Board } from '../board/utilities/board.interfaces';
import { BoardsFacade } from '../store/boards.facade';
import { UpdateBoardResponse } from './boards.interfaces';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  constructor(
    private boardsFacade: BoardsFacade,
    private authService: AuthenticationService,
    private http: HttpClient,
    private workspacesService: WorkspacesService
  ) {}

  public getIsLoading(): Observable<boolean> {
    return this.boardsFacade.getIsLoading();
  }

  public getIsLoaded(): Observable<boolean> {
    return this.boardsFacade.getIsLoaded();
  }

  public getLoadingError(): Observable<any> {
    return this.boardsFacade.getLoadingError();
  }

  public getBoards(): Observable<Board[]> {
    return this.boardsFacade.getBoards();
  }

  public getBoardById(boardId: string, workspaceId: string): Observable<Board> {
    return this.workspacesService
      .getWorkspaceById(workspaceId)
      .pipe(
        map((workspace) =>
          workspace.boards.find((board) => board.id === boardId)
        )
      );
  }

  public getBoardsForWorkspace(workspaceId: string): Observable<Board[]> {
    return this.getBoards().pipe(
      filter((boards) =>
        boards.some((board) => board.workspaceId === workspaceId)
      )
    );
  }

  public createBoard(
    workspaceId: string,
    title: string,
    backgroundColor: Color = Color.Gray
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
              const board: Board = {
                id: response.name,
                workspaceId: workspaceId,
                title: title,
                backgroundColor: backgroundColor,
              };
              this.boardsFacade.addBoard(board);
              return board;
            })
          )
      )
    );
  }

  public updateBoard(board: Board): Observable<Board> {
    return this.authService.getUserLoggedIn().pipe(
      filter((user) => !!user && !!user.token),
      exhaustMap((user) =>
        this.http
          .patch<UpdateBoardResponse>(
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/boards/${board.id}.json`,
            {
              workspaceId: board.workspaceId,
              title: board.title,
              backgroundColor: board.backgroundColor,
            }
          )
          .pipe(
            map((response) => {
              board = {
                id: board.id,
                workspaceId: response.workspaceId,
                title: response.title,
                backgroundColor: response.backgroundColor,
              };

              this.boardsFacade.updateBoard(board);
              return board;
            })
          )
      )
    );
  }

  public deleteBoard(boardId: string): void {
    this.boardsFacade.deleteBoard(boardId);
  }
}

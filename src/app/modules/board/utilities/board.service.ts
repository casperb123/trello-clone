import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, Observable } from 'rxjs';
import { CreateResponse } from 'src/app/utilities/app.interfaces';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { Workspace } from '../../workspace/utilities/workspace.models';
import { WorkspaceService } from '../../workspace/utilities/workspace.service';
import { BoardsObject, UpdateBoardResponse } from './board.interfaces';
import { Board } from './board.models';

@Injectable({ providedIn: 'root' })
export class BoardService {
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private workspaceService: WorkspaceService
  ) {}

  public getBoards(boardsObject: BoardsObject, workspaceId: string): Board[] {
    return boardsObject
      ? Object.keys(boardsObject).map((boardIndex) => {
          return new Board(
            boardIndex,
            workspaceId,
            boardsObject[boardIndex].title,
            boardsObject[boardIndex].backgroundColor
          );
        })
      : null;
  }

  public getBoardById(boardId: string, workspaceId: string): Observable<Board> {
    return this.workspaceService
      .getWorkspaceById(workspaceId)
      .pipe(
        map((workspace) =>
          workspace.boards.find((board) => board.id === boardId)
        )
      );
  }

  public createBoard(
    workspace: Workspace,
    title: string,
    backgroundColor: string
  ): Observable<Board> {
    return this.authService.getUserLoggedIn().pipe(
      filter((user) => !!user && !!user.token),
      exhaustMap((user) =>
        this.http
          .post<CreateResponse>(
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/workspace/${workspace.id}/boards.json`,
            {
              workspaceId: workspace.id,
              title: title,
              backgroundColor: backgroundColor,
            }
          )
          .pipe(
            map((response) => {
              const board = new Board(
                response.name,
                workspace.id,
                title,
                backgroundColor
              );
              const newWorkspace = new Workspace(
                workspace.id,
                workspace.title,
                workspace.description,
                [...workspace.boards, board]
              );
              this.workspaceService.updateWorkspace(newWorkspace);

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
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/board/${board.id}.json`,
            {
              workspaceId: board.workspaceId,
              title: board.title,
              backgroundColor: board.backgroundColor,
            }
          )
          .pipe(
            map((response) => {
              board.workspaceId = response.workspaceId;
              board.title = response.title;
              board.backgroundColor = response.backgroundColor;

              this.workspaceService.updateWorkspace(board.workspace);
              return board;
            })
          )
      )
    );
  }

  public deleteBoard(board: Board): void {
    const index = board.workspace.boards.indexOf(board);
    board.workspace.boards.splice(index, 1);
    this.workspaceService.updateWorkspace(board.workspace);
  }
}

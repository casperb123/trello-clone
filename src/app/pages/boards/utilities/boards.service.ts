import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, Observable } from 'rxjs';
import { BoardsFacade } from 'src/app/stores/boards/boards.facade';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CreateBoardResponse } from './boards.interfaces';
import { Board } from './boards.models';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  constructor(
    private boardsFacade: BoardsFacade,
    private authService: AuthenticationService,
    private http: HttpClient
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

  public getBoardById(boardId: string): Observable<Board> {
    return this.boardsFacade.getBoardById(boardId);
  }

  public createBoard(title: string): Observable<Board> {
    return this.authService.getUserLoggedIn().pipe(
      filter((user) => !!user && !!user.token),
      exhaustMap((user) =>
        this.http
          .post<CreateBoardResponse>(
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/boards.json`,
            {
              title: title,
            },
            {
              params: new HttpParams().set('auth', user.token),
            }
          )
          .pipe(
            map((response) => {
              const board = new Board(response.name, title);
              this.boardsFacade.addBoard(board);
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { Board } from '../utilities/board.models';
import * as actions from './board.actions';

@Injectable()
export class BoardEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadBoards),
      switchMap(() => this.authService.getUserLoggedIn()),
      exhaustMap((user) => {
        if (!user || !user.token) {
          return of(
            actions.loadBoardsError({ error: new Error('Not logged in') })
          );
        }

        return this.http
          .get(
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/boards.json`
          )
          .pipe(
            map((response) => {
              if (!response) {
                return actions.loadBoardsSuccess({ boards: [] });
              }

              const boardsArray: Board[] = Object.keys(response).map(
                (boardId) => {
                  const board = new Board(
                    boardId,
                    response[boardId].workspaceId,
                    response[boardId].title,
                    response[boardId].backgroundColor
                  );
                  return board;
                }
              );

              return actions.loadBoardsSuccess({ boards: boardsArray });
            }),
            catchError((error) => of(actions.loadBoardsError({ error: error })))
          );
      })
    )
  );
}

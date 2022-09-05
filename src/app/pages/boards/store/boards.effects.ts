import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/pages/authentication/utilities/authentication.service';
import { Board } from '../board/utilities/board.interfaces';
import * as actions from './boards.actions';

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
      exhaustMap((user) =>
        this.http
          .get(
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/boards.json`
          )
          .pipe(
            map((response) => {
              const boardsArray: Board[] = [];
              for (const key in response) {
                boardsArray.push({
                  id: key,
                  workspaceId: response[key].workspaceId,
                  title: response[key].title,
                  backgroundColor: response[key].backgroundColor,
                });
              }
              return actions.loadBoardsSuccess({ boards: boardsArray });
            }),
            catchError((error) => of(actions.loadBoardsError({ error: error })))
          )
      )
    )
  );
}

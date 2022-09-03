import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/pages/authentication/utilities/authentication.service';
import { Board } from 'src/app/pages/boards/utilities/boards.models';
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
                boardsArray.push(
                  new Board(key, response[key].title, response[key].lists)
                );
              }
              return actions.loadBoardsSuccess({ boards: boardsArray });
            }),
            catchError((error) => of(actions.loadBoardsError({ error: error })))
          )
      )
    )
  );
}

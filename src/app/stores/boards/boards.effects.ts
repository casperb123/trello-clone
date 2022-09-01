import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  combineLatestWith,
  exhaustMap,
  map,
  of,
  switchMap,
} from 'rxjs';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { Board } from 'src/app/pages/boards/board/board.interface';
import * as actions from './boards.actions';
import { CreateBoardResponse } from './interfaces/create-board-response.interface';

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
            'https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/boards.json',
            {
              params: new HttpParams().set('access_token', user.token),
            }
          )
          .pipe(
            map((resData) => {
              const boardsArray: Board[] = [];
              for (const key in resData) {
                if (resData.hasOwnProperty(key)) {
                  boardsArray.push({
                    ...resData[key],
                    id: key,
                  });
                }
              }
              return actions.loadBoardsSuccess({ boards: boardsArray });
            }),
            catchError(() => of(actions.loadBoardsError()))
          )
      )
    )
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createBoard),
      combineLatestWith(this.authService.getUserLoggedIn()),
      exhaustMap(([action, user]) =>
        this.http
          .post<CreateBoardResponse>(
            'https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/boards.json',
            {
              title: action.title,
            },
            {
              params: new HttpParams().set('access_token', user.token),
            }
          )
          .pipe(
            map((resData) =>
              actions.createBoardSuccess({
                board: {
                  id: resData.id,
                  title: action.title,
                  lists: [],
                },
              })
            ),
            catchError((error) =>
              of(actions.createBoardError({ error: error }))
            )
          )
      )
    )
  );
}

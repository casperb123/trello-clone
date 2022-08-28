import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Board } from 'src/app/pages/boards/board/board.interface';
import * as actions from './boards.actions';
import { CreateBoardResponse } from './interfaces/create-board-response.interface';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadBoards),
      exhaustMap(() =>
        this.http
          .get(
            'https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/boards.json'
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
      exhaustMap((action) =>
        this.http
          .post<CreateBoardResponse>(
            'https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/boards.json',
            {
              title: action.title,
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

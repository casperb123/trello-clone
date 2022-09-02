import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Board } from 'src/app/pages/boards/utilities/boards.models';
import * as actions from './boards.actions';
import { State } from './boards.reducer';
import * as selectors from './boards.selectors';

@Injectable({ providedIn: 'root' })
export class BoardsFacade {
  constructor(private store$: Store<State>) {}

  public getBoardsState(): Observable<State> {
    return this.store$.select(selectors.selectBoardsState);
  }

  public getIsLoading(): Observable<boolean> {
    return this.store$.select(selectors.getIsLoading);
  }

  public getIsLoaded(): Observable<boolean> {
    return this.store$.select(selectors.getIsLoaded);
  }

  public getLoadingError(): Observable<any> {
    return this.store$.select(selectors.getLoadingError);
  }

  public getBoards(): Observable<Board[]> {
    return this.getBoardsState().pipe(
      tap((state) => {
        if (state && !state.loading && !state.loaded && !state.loadingError) {
          this.store$.dispatch(actions.loadBoards());
        }
      }),
      filter((state) => state.loaded && !state.loading),
      switchMap(() => this.store$.select(selectors.getAllBoards))
    );
  }

  public getBoardById(boardId: string): Observable<Board> {
    return this.store$.select(selectors.getBoardById(boardId));
  }

  public addBoard(board: Board): void {
    this.store$.dispatch(actions.addBoard({ board: board }));
  }

  public deleteBoard(boardId: string): void {
    this.store$.dispatch(actions.deleteBoard({ boardId: boardId }));
  }
}

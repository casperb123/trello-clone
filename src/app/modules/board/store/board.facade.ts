import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Board } from '../utilities/board.models';
import * as actions from './board.actions';
import { State } from './board.reducer';
import * as selectors from './board.selectors';

@Injectable({ providedIn: 'root' })
export class BoardFacade {
  constructor(private store$: Store<State>) {}

  public getBoardState(): Observable<State> {
    return this.store$.select(selectors.selectBoardsState);
  }

  public getIsLoading(): Observable<boolean> {
    return this.store$.select(selectors.getIsLoading);
  }

  public getIsLoaded(): Observable<boolean> {
    return this.store$.select(selectors.getIsLoaded);
  }

  public getLoadingError(): Observable<boolean> {
    return this.store$.select(selectors.getLoadingError);
  }

  public getBoards(): Observable<Board[]> {
    return this.getBoardState().pipe(
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

  public updateBoard(board: Board): void {
    const boardUpdate: Update<Board> = {
      id: board.id,
      changes: {
        title: board.title,
        backgroundColor: board.backgroundColor,
      },
    };
  }

  public deleteBoard(boardId: string): void {
    this.store$.dispatch(actions.deleteBoard({ boardId: boardId }));
  }

  public unloadBoards(): void {
    this.store$.dispatch(actions.unloadBoards());
  }
}

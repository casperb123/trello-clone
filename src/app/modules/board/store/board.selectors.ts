import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './board.reducer';

export const selectFeatureState =
  createFeatureSelector<reducer.State>('boards');

export const selectBoardsState = createSelector(
  selectFeatureState,
  (state) => state
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  reducer.adapter.getSelectors(selectBoardsState);

export const getIsLoading = createSelector(
  selectBoardsState,
  (state) => state.loading
);

export const getIsLoaded = createSelector(
  selectBoardsState,
  (state) => state.loaded
);

export const getLoadingError = createSelector(
  selectBoardsState,
  (state) => state.loadingError
);

export const getAllBoards = createSelector(selectAll, (boards) => boards);

export const getBoardById = (boardId: string) =>
  createSelector(getAllBoards, (boards) =>
    boards.find((board) => board.id === boardId)
  );

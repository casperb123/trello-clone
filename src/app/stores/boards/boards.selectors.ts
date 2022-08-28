import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './boards.reducer';

export const selectFeatureState =
  createFeatureSelector<reducer.State>('boards');

export const selectBoardsState = createSelector(
  selectFeatureState,
  (state) => state
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  reducer.adapter.getSelectors(selectBoardsState);

export const getAllBoards = createSelector(selectAll, (boards) => boards);

export const getBoardById = (boardId: string) =>
  createSelector(getAllBoards, (entities) =>
    entities.find((board) => board.id === boardId)
  );

export const getLoadingBoardsState = createSelector(
  selectBoardsState,
  (state) => state.loading
);

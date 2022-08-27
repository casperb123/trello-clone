import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './boards-state.interface';
import { adapter } from './boards.reducer';

export const getBoardsState = createFeatureSelector<BoardsState>('boards');

export const selectBoardsState = createSelector(
  getBoardsState,
  (state) => state
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectBoardsState);

export const selectBoards = createSelector(selectAll, (boards) => boards);

export const selectBoardById = (boardId: string) =>
  createSelector(selectEntities, (entities) => entities[boardId]!);

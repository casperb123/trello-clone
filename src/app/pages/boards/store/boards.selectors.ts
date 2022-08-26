import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from '../interfaces/boards-state';
import { adapter } from './boards.reducer';

export const getBoardsState = createFeatureSelector<BoardsState>('board');

export const selectBoardsState = createSelector(
  getBoardsState,
  (state) => state
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectBoardsState);

export const selectBoards = createSelector(selectAll, (boards) => boards);

export const selectBoardById = (boardId: string) =>
  createSelector(selectEntities, (entities) => entities[boardId]!);

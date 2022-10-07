import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Board } from '../utilities/board.models';

export const loadBoards = createAction('[Boards] Load Boards');

export const loadBoardsSuccess = createAction(
  '[Boards] Load Boards Success',
  props<{ boards: Board[] }>()
);

export const loadBoardsError = createAction(
  '[Boards] Load Boards Error',
  props<{ error: any }>()
);

export const unloadBoards = createAction('[Boards] Unload Boards');

export const addBoard = createAction(
  '[Boards] Add Board',
  props<{ board: Board }>()
);

export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ board: Update<Board> }>()
);

export const deleteBoard = createAction(
  '[Boards] Delete Board',
  props<{ boardId: string }>()
);

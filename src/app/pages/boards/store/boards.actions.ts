import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Board } from '../interfaces/board';

export const getBoards = createAction('[Boards] Get Boards');

export const getBoardsSuccess = createAction(
  '[Boards] Get Boards Success',
  props<{ boards: Board[] }>()
);

export const getBoardsError = createAction(
  '[Boards] Get Boards Error',
  props<{ error: any }>()
);

export const saveBoards = createAction(
  '[Boards] Save Boards',
  props<{ boards: Board[] }>()
);

export const saveBoardsSuccess = createAction('[Boards] Save Boards Success');

export const saveBoardsError = createAction(
  '[Boards] Save Boards Error',
  props<{ error: any }>()
);

export const createBoard = createAction(
  '[Boards] Create Board',
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

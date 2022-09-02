import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/pages/boards/utilities/boards.models';

export const loadBoards = createAction('[Boards] Load Boards');

export const loadBoardsSuccess = createAction(
  '[Boards] Load Boards Success',
  props<{ boards: Board[] }>()
);

export const loadBoardsError = createAction(
  '[Boards] Load Boards Error',
  props<{ error: any }>()
);

export const resetBoards = createAction('[Boards] Reset Boards');

export const addBoard = createAction(
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

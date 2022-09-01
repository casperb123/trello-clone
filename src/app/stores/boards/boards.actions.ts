import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/pages/boards/board/board.interface';

export const loadBoards = createAction('[Boards] Load Boards');

export const loadBoardsSuccess = createAction(
  '[Boards] Load Boards Success',
  props<{ boards: Board[] }>()
);

export const loadBoardsError = createAction(
  '[Boards] Load Boards Error',
  props<{ error: any }>()
);

export const createBoard = createAction(
  '[Boards] Create Board',
  props<{ title: string }>()
);

export const createBoardSuccess = createAction(
  '[Boards] Create Board Success',
  props<{ board: Board }>()
);

export const createBoardError = createAction(
  '[Boards] Create Board Error',
  props<{ error: any }>()
);

export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ board: Update<Board> }>()
);

export const updateBoardSuccess = createAction(
  '[Boards] Update Board Success',
  props<{ board: Board }>()
);

export const updateBoardError = createAction(
  '[Boards] Update Board Error',
  props<{ error: any }>()
);

export const deleteBoard = createAction(
  '[Boards] Delete Board',
  props<{ boardId: string }>()
);

export const deleteBoardSuccess = createAction('[Boards] Delete Board Success');

export const deleteBoardError = createAction(
  '[Boards] Delete Board Error',
  props<{ error: any }>()
);

export const resetCreateState = createAction('[Boards] Reset Create State');

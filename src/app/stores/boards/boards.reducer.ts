import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/pages/boards/board/board.interface';
import * as actions from './boards.actions';

export interface State extends EntityState<Board> {
  loading: boolean;
  loaded: boolean;
  loadingError: boolean;
  updating: boolean;
  updated: boolean;
  updatingError: boolean;
}

export const adapter = createEntityAdapter<Board>({
  selectId: (board) => board.id,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  loadingError: false,
  updating: false,
  updated: false,
  updatingError: false,
});

export const boardsReducer = createReducer(
  initialState,
  on(actions.loadBoards, (state) => ({
    ...state,
    loading: true,
    loadingError: false,
  })),
  on(actions.loadBoardsSuccess, (state, action) =>
    adapter.setAll(action.boards, {
      ...state,
      loaded: true,
      loading: false,
    })
  ),
  on(actions.loadBoardsError, (state) => ({
    ...state,
    loading: false,
    loadingError: true,
  })),
  on(actions.createBoard, (state) => ({
    ...state,
    saving: true,
    savingFailed: false,
    savingError: null,
  })),
  on(actions.createBoardSuccess, (state, action) =>
    adapter.addOne(action.board, {
      ...state,
      saving: false,
      saved: true,
    })
  ),
  on(actions.updateBoard, (state, action) =>
    adapter.updateOne(action.board, state)
  ),
  on(actions.deleteBoard, (state, action) =>
    adapter.removeOne(action.boardId, state)
  )
);

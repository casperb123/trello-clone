import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Board } from '../interfaces/board';
import { BoardsState } from '../interfaces/boards-state';
import * as actions from './boards.actions';

export const adapter = createEntityAdapter<Board>();

export const initialState: BoardsState = adapter.getInitialState({
  loading: false,
  loaded: false,
  loadingFailed: false,
  saving: false,
  saved: false,
  savingFailed: false,
});

export const reducer = createReducer(
  initialState,
  on(actions.getBoards, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    loadingFailed: false,
    error: null,
  })),
  on(actions.getBoardsSuccess, (state, action) =>
    adapter.addMany(action.boards, {
      ...state,
      loaded: true,
      loading: false,
    })
  ),
  on(actions.getBoardsError, (state, action) => ({
    ...state,
    loading: false,
    loadingFailed: true,
    error: action.error,
  })),
  on(actions.saveBoards, (state, action) => ({
    ...state,
    saving: true,
    saved: false,
    savingFailed: false,
    savingError: null,
  })),
  on(actions.saveBoardsSuccess, (state) => ({
    ...state,
    saved: true,
    saving: false,
  })),
  on(actions.saveBoardsError, (state, action) => ({
    ...state,
    saving: false,
    savingFailed: true,
    savingError: action.error,
  })),
  on(actions.createBoard, (state, action) =>
    adapter.addOne(action.board, state)
  ),
  on(actions.updateBoard, (state, action) =>
    adapter.updateOne(action.board, state)
  ),
  on(actions.deleteBoard, (state, action) =>
    adapter.removeOne(action.boardId, state)
  )
);

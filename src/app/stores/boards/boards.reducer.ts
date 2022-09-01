import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/pages/boards/board/board.interface';
import * as actions from './boards.actions';

export interface State extends EntityState<Board> {
  loading: boolean;
  loaded: boolean;
  loadingError: any;
  create: {
    loading: boolean;
    loaded: boolean;
    loadingError: any;
  };
}

export const adapter = createEntityAdapter<Board>({
  selectId: (board) => board.id,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  loadingError: null,
  create: {
    loading: false,
    loaded: false,
    loadingError: null,
  },
});

export const boardsReducer = createReducer(
  initialState,
  on(actions.loadBoards, (state) => ({
    ...state,
    loading: true,
    loadingError: null,
  })),
  on(actions.loadBoardsSuccess, (state, action) =>
    adapter.setAll(action.boards, {
      ...state,
      loaded: true,
      loading: false,
    })
  ),
  on(actions.loadBoardsError, (state, action) => ({
    ...state,
    loading: false,
    loadingError: action.error,
  })),
  on(actions.createBoard, (state) => ({
    ...state,
    create: {
      ...state.create,
      loading: true,
    },
  })),
  on(actions.createBoardSuccess, (state, action) =>
    adapter.addOne(action.board, {
      ...state,
      create: {
        ...state.create,
        loaded: true,
        loading: false,
      },
    })
  ),
  on(actions.createBoardError, (state, action) => ({
    ...state,
    create: {
      ...state.create,
      loading: false,
      loadingError: action.error,
    },
  })),
  on(actions.updateBoard, (state, action) =>
    adapter.updateOne(action.board, state)
  ),
  on(actions.deleteBoard, (state, action) =>
    adapter.removeOne(action.boardId, state)
  ),
  on(actions.resetCreateState, (state) => ({
    ...state,
    create: initialState.create,
  }))
);

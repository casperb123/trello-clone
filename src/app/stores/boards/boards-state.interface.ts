import { EntityState } from '@ngrx/entity';
import { Board } from 'src/app/pages/board/board.interface';

export interface BoardsState extends EntityState<Board> {
  loading: boolean;
  loaded: boolean;
  loadingFailed: boolean;
  loadingError?: any;
  saving: boolean;
  saved: boolean;
  savingFailed: boolean;
  savingError?: any;
}

import { Color } from './board.enums';
import { Board } from './board.models';

export interface UpdateBoardResponse {
  workspaceId: string;
  title: string;
  backgroundColor: Color;
}

export interface BoardsObject {
  boardId: Board;
}

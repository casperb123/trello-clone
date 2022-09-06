import { Color } from '../board/utilities/board.enums';
import { Board } from '../board/utilities/board.models';

export interface UpdateBoardResponse {
  workspaceId: string;
  title: string;
  backgroundColor: Color;
}

export interface BoardsObject {
  boardId: Board;
}

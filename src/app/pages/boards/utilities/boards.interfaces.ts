import { Color } from '../board/utilities/board.enums';

export interface UpdateBoardResponse {
  workspaceId: string;
  title: string;
  backgroundColor: Color;
}

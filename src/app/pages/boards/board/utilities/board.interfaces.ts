import { Color } from './board.enums';

export interface Board {
  id: string;
  workspaceId: string;
  title: string;
  backgroundColor: Color;
}

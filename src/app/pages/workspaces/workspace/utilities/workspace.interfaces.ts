import { Board } from 'src/app/pages/boards/board/utilities/board.interfaces';

export interface Workspace {
  id: string;
  title: string;
  description?: string;
  boards: Board[];
}

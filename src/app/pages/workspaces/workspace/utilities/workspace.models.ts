import { Board } from 'src/app/pages/boards/board/utilities/board.models';

export class Workspace {
  constructor(
    public id: string,
    public title: string,
    public description?: string,
    public boards?: Board[]
  ) {
    if (!this.boards) {
      this.boards = [];
    }
  }
}

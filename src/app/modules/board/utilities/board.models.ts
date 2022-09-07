import { Workspace } from 'src/app/modules/workspace/utilities/workspace.models';

export class Board {
  public workspace: Workspace;

  constructor(
    public id: string,
    public workspaceId: string,
    public title: string,
    public backgroundColor: string
  ) {}
}

export class List {
  constructor(public title: string, public cards: Card[]) {}
}

export class Card {
  constructor(public text: string) {}
}

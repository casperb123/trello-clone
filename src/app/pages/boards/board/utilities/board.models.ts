import { Workspace } from 'src/app/pages/workspaces/workspace/utilities/workspace.models';

export class Board {
  public workspace: Workspace;

  constructor(
    public id: string,
    public workspaceId: string,
    public title: string,
    public backgroundColor: string
  ) {}
}

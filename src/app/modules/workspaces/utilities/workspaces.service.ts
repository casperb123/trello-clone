import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { WorkspacesFacade } from '../store/workspaces.facade';
import { Workspace } from '../workspace/utilities/workspace.models';
import { CreateWorkspaceResponse } from './workspaces.interfaces';

@Injectable({
  providedIn: 'root',
})
export class WorkspacesService {
  constructor(
    private workspacesFacade: WorkspacesFacade,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  public getIsLoading(): Observable<boolean> {
    return this.workspacesFacade.getIsLoading();
  }

  public getIsLoaded(): Observable<boolean> {
    return this.workspacesFacade.getIsLoaded();
  }

  public getLoadingError(): Observable<any> {
    return this.workspacesFacade.getLoadingError();
  }

  public getWorkspaces(): Observable<Workspace[]> {
    return this.authService.getUserLoggedIn().pipe(
      filter((user) => !!user && !!user.token),
      exhaustMap((user) =>
        this.workspacesFacade.getWorkspaces(!!user && !!user.token)
      )
    );
  }

  public getWorkspaceById(workspaceId: string): Observable<Workspace> {
    return this.workspacesFacade.getWorkspaceById(workspaceId);
  }

  public createWorkspace(
    title: string,
    description?: string
  ): Observable<Workspace> {
    return this.authService.getUserLoggedIn().pipe(
      filter((user) => !!user && !!user.token),
      exhaustMap((user) =>
        this.http
          .post<CreateWorkspaceResponse>(
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/workspaces.json`,
            {
              title: title,
              description: description,
            }
          )
          .pipe(
            map((response) => {
              const workspace: Workspace = {
                id: response.name,
                title: title,
                description: description,
                boards: [],
              };
              this.workspacesFacade.addWorkspace(workspace);
              return workspace;
            })
          )
      )
    );
  }

  public updateWorkspace(workspace: Workspace): void {
    this.workspacesFacade.updateWorkspace(workspace);
  }

  public deleteWorkspace(workspaceId: string): void {
    this.workspacesFacade.deleteWorkspace(workspaceId);
  }
}

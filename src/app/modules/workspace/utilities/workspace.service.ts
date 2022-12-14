import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, filter, map, Observable } from 'rxjs';
import { ApiEndpoint, ApiType } from 'src/app/utilities/app.enums';
import { Api } from 'src/app/utilities/app.service';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { WorkspaceFacade } from '../store/workspace.facade';
import { CreateWorkspaceResponse } from './workspace.interfaces';
import { Workspace } from './workspace.models';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(
    private workspaceFacade: WorkspaceFacade,
    private authService: AuthenticationService,
    private http: HttpClient,
    private api: Api
  ) {}

  public getIsLoading(): Observable<boolean> {
    return this.workspaceFacade.getIsLoading();
  }

  public getIsLoaded(): Observable<boolean> {
    return this.workspaceFacade.getIsLoaded();
  }

  public getLoadingError(): Observable<any> {
    return this.workspaceFacade.getLoadingError();
  }

  public getWorkspaces(): Observable<Workspace[]> {
    return this.authService.getUserLoggedIn().pipe(
      filter((user) => !!user && !!user.token),
      exhaustMap((user) =>
        this.workspaceFacade.getWorkspaces(!!user && !!user.token)
      )
    );
  }

  public getWorkspaceById(workspaceId: string): Observable<Workspace> {
    return this.workspaceFacade.getWorkspaceById(workspaceId);
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
            this.api.getApiUrl(
              ApiType.Database,
              ApiEndpoint.Workspaces,
              user.id
            ),
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
              };
              this.workspaceFacade.addWorkspace(workspace);
              return workspace;
            })
          )
      )
    );
  }

  public updateWorkspace(workspace: Workspace): void {
    this.workspaceFacade.updateWorkspace(workspace);
  }

  public deleteWorkspace(workspaceId: string): void {
    this.workspaceFacade.deleteWorkspace(workspaceId);
  }

  public unloadWorkspaces(): void {
    this.workspaceFacade.unloadWorkspaces();
  }
}

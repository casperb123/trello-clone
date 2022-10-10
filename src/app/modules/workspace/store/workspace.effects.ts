import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ApiEndpoint, ApiType } from 'src/app/utilities/app.enums';
import { Api } from 'src/app/utilities/app.service';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { Workspace } from '../utilities/workspace.models';
import * as actions from './workspace.actions';

@Injectable()
export class WorkspaceEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthenticationService,
    private api: Api
  ) {}

  loadWorkspaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadWorkspaces),
      switchMap(() => this.authService.getUserLoggedIn()),
      exhaustMap((user) => {
        if (!user || !user.token) {
          return of(
            actions.loadWorkspacesError({ error: new Error('Not logged in') })
          );
        }

        return this.http
          .get(
            this.api.getApiUrl(
              ApiType.Database,
              ApiEndpoint.Workspaces,
              user.id
            )
          )
          .pipe(
            map((response) => {
              if (!response) {
                return actions.loadWorkspacesSuccess({ workspaces: [] });
              }

              const workspacesArray: Workspace[] = Object.keys(response).map(
                (workspaceId) => {
                  const workspace = new Workspace(
                    workspaceId,
                    response[workspaceId].title,
                    response[workspaceId].description
                  );
                  return workspace;
                }
              );

              return actions.loadWorkspacesSuccess({
                workspaces: workspacesArray,
              });
            }),
            catchError((error) => {
              return of(actions.loadWorkspacesError({ error: error }));
            })
          );
      })
    )
  );
}

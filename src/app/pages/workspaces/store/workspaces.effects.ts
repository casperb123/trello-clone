import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, filter, map, switchMap } from 'rxjs';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { Workspace } from '../workspace/utilities/workspace.interfaces';
import * as actions from './workspaces.actions';

@Injectable()
export class WorkspacesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  loadWorkspaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadWorkspaces),
      switchMap(() => this.authService.getUserLoggedIn()),
      filter((user) => !!user && !!user.token),
      exhaustMap((user) =>
        this.http
          .get(
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/workspaces.json`
          )
          .pipe(
            map((response) => {
              const workspacesArray: Workspace[] = [];
              for (const key in response) {
                workspacesArray.push({
                  id: key,
                  title: response[key].title,
                  description: response[key].description,
                  boards: response[key].boards,
                });
              }
              return actions.loadWorkspacesSuccess({
                workspaces: workspacesArray,
              });
            })
          )
      )
    )
  );
}

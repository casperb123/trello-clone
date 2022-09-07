import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../../authentication/utilities/authentication.service';
import { BoardService } from '../../board/utilities/board.service';
import { Workspace } from '../utilities/workspace.models';
import * as actions from './workspace.actions';

@Injectable()
export class WorkspaceEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthenticationService,
    private boardService: BoardService
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
            `https://trello-clone-b2507-default-rtdb.europe-west1.firebasedatabase.app/${user.id}/workspaces.json`
          )
          .pipe(
            map((response) => {
              if (!response) {
                return actions.loadWorkspacesSuccess({ workspaces: [] });
              }

              const workspacesArray: Workspace[] = Object.keys(response).map(
                (workspaceId) => {
                  const boards = this.boardService.getBoards(
                    response[workspaceId].boards,
                    workspaceId
                  );
                  const workspace = new Workspace(
                    workspaceId,
                    response[workspaceId].title,
                    response[workspaceId].description,
                    boards
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

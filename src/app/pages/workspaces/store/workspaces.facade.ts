import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Workspace } from '../workspace/utilities/workspace.interfaces';
import * as actions from './workspaces.actions';
import { State } from './workspaces.reducer';
import * as selectors from './workspaces.selectors';

@Injectable({ providedIn: 'root' })
export class WorkspacesFacade {
  constructor(private store$: Store<State>) {}

  public getWorkspacesState(): Observable<State> {
    return this.store$.select(selectors.selectWorkspacesState);
  }

  public getIsLoading(): Observable<boolean> {
    return this.store$.select(selectors.getIsLoading);
  }

  public getIsLoaded(): Observable<boolean> {
    return this.store$.select(selectors.getIsLoaded);
  }

  public getLoadingError(): Observable<any> {
    return this.store$.select(selectors.getLoadingError);
  }

  public getWorkspaces(): Observable<Workspace[]> {
    return this.getWorkspacesState().pipe(
      tap((state) => {
        if (state && !state.loading && !state.loaded && !state.loadingError) {
          this.store$.dispatch(actions.loadWorkspaces());
        }
      }),
      filter((state) => state.loaded && !state.loading),
      switchMap(() => this.store$.select(selectors.getAllWorkspaces))
    );
  }

  public getWorkspaceById(workspaceId: string): Observable<Workspace> {
    return this.store$.select(selectors.getWorkspaceById(workspaceId));
  }

  public addWorkspace(workspace: Workspace): void {
    this.store$.dispatch(actions.addWorkspace({ workspace: workspace }));
  }

  public updateWorkspace(workspace: Workspace): void {
    const workspaceUpdate: Update<Workspace> = {
      id: workspace.id,
      changes: {
        title: workspace.title,
        boards: workspace.boards,
      },
    };

    this.store$.dispatch(
      actions.updateWorkspace({ workspace: workspaceUpdate })
    );
  }

  public deleteWorkspace(workspaceId: string): void {
    this.store$.dispatch(actions.deleteWorkspace({ workspaceId: workspaceId }));
  }
}

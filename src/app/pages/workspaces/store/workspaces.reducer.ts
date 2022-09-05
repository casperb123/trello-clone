import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Workspace } from '../workspace/utilities/workspace.interfaces';
import * as actions from './workspaces.actions';

export interface State extends EntityState<Workspace> {
  loading: boolean;
  loaded: boolean;
  loadingError: any;
}

export const adapter = createEntityAdapter<Workspace>({
  selectId: (workspace) => workspace.id,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  loadingError: null,
});

export const workspacesReducer = createReducer(
  initialState,
  on(actions.loadWorkspaces, (state) => ({
    ...state,
    loading: true,
    loadingError: null,
  })),
  on(actions.loadWorkspacesSuccess, (state, action) =>
    adapter.setAll(action.workspaces, {
      ...state,
      loaded: true,
      loading: false,
    })
  ),
  on(actions.loadWorkspacesError, (state, action) => ({
    ...state,
    loading: false,
    loadingError: action.error,
  })),
  on(actions.unloadWorkspaces, () =>
    adapter.removeAll({
      ...initialState,
    })
  ),
  on(actions.addWorkspace, (state, action) =>
    adapter.addOne(action.workspace, {
      ...state,
    })
  ),
  on(actions.updateWorkspace, (state, action) =>
    adapter.updateOne(action.workspace, {
      ...state,
    })
  ),
  on(actions.deleteWorkspace, (state, action) =>
    adapter.removeOne(action.workspaceId, {
      ...state,
    })
  )
);

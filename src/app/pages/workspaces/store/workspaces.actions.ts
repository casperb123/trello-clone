import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Workspace } from '../workspace/utilities/workspace.interfaces';

export const loadWorkspaces = createAction('[Workspaces] Load Workspaces');

export const loadWorkspacesSuccess = createAction(
  '[Workspaces] Load Workspaces Success',
  props<{ workspaces: Workspace[] }>()
);

export const loadWorkspacesError = createAction(
  '[Workspaces] Load Workspaces Error',
  props<{ error: any }>()
);

export const unloadWorkspaces = createAction('[Workspaces] Unload Workspaces');

export const addWorkspace = createAction(
  '[Workspaces] Add Workspace',
  props<{ workspace: Workspace }>()
);

export const updateWorkspace = createAction(
  '[Workspaces] Update Workspace',
  props<{ workspace: Update<Workspace> }>()
);

export const deleteWorkspace = createAction(
  '[Workspaces] Delete Workspace',
  props<{ workspaceId: string }>()
);

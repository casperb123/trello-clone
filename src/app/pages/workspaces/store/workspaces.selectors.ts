import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './workspaces.reducer';

export const selectFeatureState =
  createFeatureSelector<reducer.State>('workspaces');

export const selectWorkspacesState = createSelector(
  selectFeatureState,
  (state) => state
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  reducer.adapter.getSelectors(selectWorkspacesState);

export const getIsLoading = createSelector(
  selectWorkspacesState,
  (state) => state.loading
);

export const getIsLoaded = createSelector(
  selectWorkspacesState,
  (state) => state.loaded
);

export const getLoadingError = createSelector(
  selectWorkspacesState,
  (state) => state.loadingError
);

export const getAllWorkspaces = createSelector(
  selectAll,
  (workspaces) => workspaces
);

export const getWorkspaceById = (workspaceId: string) =>
  createSelector(getAllWorkspaces, (workspaces) =>
    workspaces.find((workspace) => workspace.id === workspaceId)
  );

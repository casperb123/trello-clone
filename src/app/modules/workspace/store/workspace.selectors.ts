import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './workspace.reducer';

export const selectFeatureState =
  createFeatureSelector<reducer.State>('workspaces');

export const selectWorkspaceState = createSelector(
  selectFeatureState,
  (state) => state
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  reducer.adapter.getSelectors(selectWorkspaceState);

export const getIsLoading = createSelector(
  selectWorkspaceState,
  (state) => state.loading
);

export const getIsLoaded = createSelector(
  selectWorkspaceState,
  (state) => state.loaded
);

export const getLoadingError = createSelector(
  selectWorkspaceState,
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

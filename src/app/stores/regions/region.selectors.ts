import { RegionEntity } from 'src/app/models/region';

import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  regionAdapter,
  regionFeatureKey,
  State,
} from './region.reducer';

const { selectAll } = regionAdapter.getSelectors();

export const selectRegionState = createFeatureSelector<State>(regionFeatureKey);

export const getRegionById = (id: string) =>
  createSelector(selectRegionState, (state: State): RegionEntity | undefined =>
    selectAll(state).find((region) => region.uid === id)
  );

export const getRegions = createSelector(
  selectRegionState,
  (state: State): RegionEntity[] => selectAll(state)
);

export const hasSelectedRegions = createSelector(
  selectRegionState,
  (state: State): boolean =>
    selectAll(state).some((region): boolean => region.selected || false)
);

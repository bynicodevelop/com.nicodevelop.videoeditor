import { RegionEntity } from 'src/app/models/region';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { regionAdapter, regionFeatureKey, State } from './region.reducer';

const { selectAll } = regionAdapter.getSelectors();

export const selectRegionState = createFeatureSelector<State>(regionFeatureKey);

export const getRegionById = (id: string) =>
  createSelector(selectRegionState, (state: State): RegionEntity | undefined =>
    selectAll(state).find((region) => region.uid === id)
  );

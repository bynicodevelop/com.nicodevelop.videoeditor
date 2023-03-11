import { createFeatureSelector, createSelector } from '@ngrx/store';

import { cutsAdapter, cutsFeatureKey, State } from './cuts.reducer';

const { selectAll } = cutsAdapter.getSelectors();

export const selectCutState = createFeatureSelector<State>(cutsFeatureKey);

export const selectCuts = createSelector(selectCutState, selectAll);

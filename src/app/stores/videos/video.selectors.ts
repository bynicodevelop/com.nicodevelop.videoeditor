import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, videoAdapter, videoFeatureKey } from './video.reducers';

const { selectAll } = videoAdapter.getSelectors();

export const selectVideoState = createFeatureSelector<State>(videoFeatureKey);

export const getVideos = createSelector(selectVideoState, selectAll);

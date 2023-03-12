import { VideoEntity } from 'src/app/models/video';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, videoAdapter, videoFeatureKey } from './video.reducers';

const { selectAll } = videoAdapter.getSelectors();

export const selectVideoState = createFeatureSelector<State>(videoFeatureKey);

export const getVideos = createSelector(selectVideoState, selectAll);

export const videoReady = createSelector(
  selectVideoState,
  (state: State): boolean =>
    selectAll(state).some((video): boolean => !!video.audio)
);

export const downloadableVideos = createSelector(
  selectVideoState,
  (state: State): VideoEntity[] =>
    selectAll(state).filter((video): boolean => !!video.output)
);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { playerFeatureKey, StatePlayer } from './player.reducer';

export const selectPlayerState =
  createFeatureSelector<StatePlayer>(playerFeatureKey);

export const isPlaying = createSelector(
  selectPlayerState,
  (state): boolean => state.isPlaying
);

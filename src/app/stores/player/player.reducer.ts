import { PlayerEntity } from 'src/app/models/player';

import { createReducer, on } from '@ngrx/store';

import { pause, play, seek } from './player.actions';

export const playerFeatureKey = 'player';

export type StatePlayer = PlayerEntity;

export const initialState: StatePlayer = {
  isPlaying: false,
} as StatePlayer;

export const playerReducer = createReducer(
  initialState,
  on(
    play,
    (state): StatePlayer => ({
      ...state,
      isPlaying: true,
    })
  ),
  on(
    pause,
    (state): StatePlayer => ({
      ...state,
      isPlaying: false,
    })
  ),
  on(
    seek,
    (state, { time }): StatePlayer => ({
      ...state,
      seek: time,
    })
  )
);

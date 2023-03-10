import { PlayerEntity } from 'src/app/models/player';

import { createReducer, on } from '@ngrx/store';

import { pause, play } from './player.actions';

export const playerFeatureKey = 'player';

export interface StatePlayer extends PlayerEntity {}

export const initialState: StatePlayer = {
  isPlaying: false,
} as StatePlayer;

export const playerReducer = createReducer(
  initialState,
  on(play, (state): any => ({
    ...state,
    isPlaying: true,
  })),
  on(pause, (state): any => ({
    ...state,
    isPlaying: false,
  }))
);

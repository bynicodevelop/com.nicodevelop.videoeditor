import { createAction, props } from '@ngrx/store';

export const play = createAction('[Player] Play');

export const pause = createAction('[Player] Pause');

export const seek = createAction('[Player] Seek', props<{ time: number }>());

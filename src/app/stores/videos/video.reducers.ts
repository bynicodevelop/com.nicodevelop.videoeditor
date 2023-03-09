import { VideoEntity } from 'src/app/models/video';

import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';

import { uploadVideos } from './video.actions';

const log = (reducer: ActionReducer<State>): ActionReducer<State> => {
  return (state, action): State => {
    const currentState = reducer(state, action);

    console.groupCollapsed(action.type);
    console.log('Etat precedent: ', state);
    console.log('Action: ', action);
    console.log('Etat suivant: ', currentState);
    console.groupEnd();

    return currentState;
  };
};

export const videoFeatureKey = 'video';

export interface State extends EntityState<VideoEntity> {}

export const videoAdapter = createEntityAdapter<VideoEntity>({
  selectId: (video: VideoEntity): string => video.name,
});

export const initialState: State = videoAdapter.getInitialState();

export const videoReducers = createReducer(
  initialState,
  on(
    uploadVideos,
    (state, { videos }): State => videoAdapter.addMany(videos, state)
  )
);

export const videoMetaReducers: MetaReducer[] = [log];

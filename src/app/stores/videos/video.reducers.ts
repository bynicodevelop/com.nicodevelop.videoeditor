import { VideoEntity } from 'src/app/models/video';

import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { updateVideo, uploadVideos } from './video.actions';

export const videoFeatureKey = 'video';

export type State = EntityState<VideoEntity>;

export const videoAdapter = createEntityAdapter<VideoEntity>({
  selectId: (video: VideoEntity): string => video.uid,
});

export const initialState: State = videoAdapter.getInitialState();

export const videoReducer = createReducer(
  initialState,
  on(
    uploadVideos,
    (state, { videos }): State => videoAdapter.addMany(videos, state)
  ),
  on(
    updateVideo,
    (state, { video }): State =>
      videoAdapter.updateOne({ id: video.uid, changes: video }, state)
  )
);

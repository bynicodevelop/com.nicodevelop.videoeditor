import { VideoEntity } from 'src/app/models/video';

import { createAction, props } from '@ngrx/store';

export const uploadVideos = createAction(
  '[Video] Upload Videos',
  props<{ videos: VideoEntity[] }>()
);

export const updateVideo = createAction(
  '[Video] Update Video',
  props<{ video: VideoEntity }>()
);

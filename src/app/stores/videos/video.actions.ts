import { CutEntity } from 'src/app/models/cuts';
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

export const exportVideo = createAction(
  '[Video] Export Video',
  props<{ video: VideoEntity; cuts: CutEntity[] }>()
);

export const downloadVideo = createAction(
  '[Video] Download Video',
  props<{ video: VideoEntity }>()
);

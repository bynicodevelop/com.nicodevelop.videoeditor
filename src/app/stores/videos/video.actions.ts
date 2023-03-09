import { VideoEntity } from 'src/app/models/video';

import { createAction, props } from '@ngrx/store';

export const uploadVideos = createAction(
  '[Video] Upload Videos',
  props<{ videos: VideoEntity[] }>()
);

export const uploadVideosSuccess = createAction(
  '[Video] Upload Videos Success',
  props<{ videos: VideoEntity[] }>()
);

export const uploadVideosFailure = createAction(
  '[Video] Upload Videos Failure',
  props<{ error: any }>()
);

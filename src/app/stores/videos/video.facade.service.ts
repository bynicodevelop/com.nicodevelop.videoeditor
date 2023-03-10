import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { uidFromFile } from 'src/app/core/lib/uid';
import { VideoEntity } from 'src/app/models/video';

import { Store } from '@ngrx/store';

import { uploadVideos } from './video.actions';
import { State } from './video.reducers';
import { getVideos, videoReady } from './video.selectors';

@Injectable({
  providedIn: 'root',
})
export class VideoFacade {
  constructor(private store: Store<State>) {}

  uploadVideos(files: File[]): void {
    const videos = files.map((file): VideoEntity => {
      const video: VideoEntity = {
        uid: uidFromFile(file),
        file,
      };
      return video;
    });

    this.store.dispatch(uploadVideos({ videos }));
  }

  getVideos(): Observable<VideoEntity[]> {
    return this.store.select(getVideos);
  }

  videoLoaded(): Observable<boolean> {
    return this.store.select(videoReady);
  }
}

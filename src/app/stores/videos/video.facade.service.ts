import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { uidFromFile } from 'src/app/core/lib/uid';
import { CutEntity } from 'src/app/models/cuts';
import { VideoEntity } from 'src/app/models/video';

import { Store } from '@ngrx/store';

import { exportVideo, updateVideo, uploadVideos } from './video.actions';
import { State } from './video.reducers';
import { downloadableVideos, getVideos, videoReady } from './video.selectors';

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

  updateVideo(video: VideoEntity): void {
    this.store.dispatch(updateVideo({ video }));
  }

  getVideos(): Observable<VideoEntity[]> {
    return this.store.select(getVideos);
  }

  videoLoaded(): Observable<boolean> {
    return this.store.select(videoReady);
  }

  exportVideo(video: VideoEntity, cuts: CutEntity[] = []): void {
    this.store.dispatch(exportVideo({ video, cuts }));
  }

  downloadableVideos(): Observable<VideoEntity[]> {
    return this.store.select(downloadableVideos);
  }
}

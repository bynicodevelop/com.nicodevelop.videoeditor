import { Injectable } from '@angular/core';

import { from, map, mergeMap, Observable, tap } from 'rxjs';
import {
  IVideo,
  VideoEntity,
  videoEntityFactory,
  videoEntityFactoryForExport,
} from 'src/app/models/video';
import { FFmpegService } from 'src/app/services/ffmpeg.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  downloadVideo,
  exportVideo,
  updateVideo,
  uploadVideos,
} from './video.actions';

@Injectable()
export class VideoEffects {
  constructor(
    private actions$: Actions,
    private ffmpegService: FFmpegService
  ) {}

  uploadVideos$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(uploadVideos),
        tap(console.log),
        mergeMap(
          ({ videos }): Observable<any> =>
            from(videos).pipe(
              mergeMap(
                (video): Observable<any> =>
                  this.ffmpegService
                    .extractAudio((video as VideoEntity).file)
                    .pipe(
                      map((audio): any =>
                        updateVideo({
                          video: videoEntityFactory(video as IVideo, audio),
                        })
                      )
                    )
              )
            )
        )
      )
  );

  exportVieo$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(exportVideo),
        mergeMap(
          ({ video }): Observable<Blob | undefined> =>
            this.ffmpegService.exportVideo(video).pipe(
              map((output): any => {
                return downloadVideo({
                  video: videoEntityFactoryForExport(video, { output }),
                });
              })
            )
        )
      )
  );
}

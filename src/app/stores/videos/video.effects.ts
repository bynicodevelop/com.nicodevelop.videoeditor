import { Injectable } from '@angular/core';

import { from, map, mergeMap, Observable } from 'rxjs';
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
        mergeMap(
          ({ videos }): Observable<any> =>
            from(videos).pipe(
              mergeMap(
                (video): Observable<any> =>
                  this.ffmpegService
                    .extractVideoData((video as VideoEntity).file)
                    .pipe(
                      map((data): any =>
                        updateVideo({
                          video: videoEntityFactory(
                            {
                              ...(video as IVideo),
                              duration: data.duration,
                            },
                            data.audio
                          ),
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
          ({ video, cuts }): Observable<Blob | undefined> =>
            this.ffmpegService.exportVideo(video, cuts).pipe(
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

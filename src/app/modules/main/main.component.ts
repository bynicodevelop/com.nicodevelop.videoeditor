import {
  Component,
  OnInit,
} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { VideoEntity } from 'src/app/models/video';
import { PlayerFacade } from 'src/app/stores/player/player.facade.service';
import { VideoFacade } from 'src/app/stores/videos/video.facade.service';

import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  videos$: Observable<VideoEntity[]> = this.videoFacade.getVideos();

  isReady$: Observable<boolean> = this.videoFacade.videoLoaded();
  isPlaying$: Observable<boolean> = this.playerFacade.isPlaying();
  isUploading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isPlaying = false;

  currentVideo?: VideoEntity;

  faDownload = faDownload;

  constructor(
    private videoFacade: VideoFacade,
    private playerFacade: PlayerFacade
  ) {}

  ngOnInit(): void {
    this.isReady$.subscribe((isReady): void => {
      if (isReady) {
        this.isUploading$.next(false);
      }
    });

    this.isPlaying$.subscribe((isPlaying): void => {
      this.isPlaying = isPlaying;
    });

    this.videos$.subscribe((videos): void => {
      if (videos.length > 0) {
        this.currentVideo = videos[0];
      }
    });
  }

  onUploadFile(files: File[]): void {
    this.isUploading$.next(true);

    this.videoFacade.uploadVideos(files);
  }

  togglePlay(): void {
    this.isPlaying ? this.playerFacade.pause() : this.playerFacade.play();
  }
}

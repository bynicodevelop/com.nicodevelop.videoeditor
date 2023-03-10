import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { VideoEntity } from 'src/app/models/video';
import { PlayerFacade } from 'src/app/stores/player/player.facade.service';
import { VideoFacade } from 'src/app/stores/videos/video.facade.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  videos$: Observable<VideoEntity[]> = this.videoFacade.getVideos();

  isReady$: Observable<boolean> = this.videoFacade.videoLoaded();
  isPlaying$: Observable<boolean> = this.playerFacade.isPlaying();

  isPlaying: boolean = false;

  constructor(
    private videoFacade: VideoFacade,
    private playerFacade: PlayerFacade
  ) {}

  ngOnInit(): void {
    this.isPlaying$.subscribe((isPlaying): void => {
      this.isPlaying = isPlaying;
    });
  }

  onUploadFile(files: File[]): void {
    this.videoFacade.uploadVideos(files);
  }

  togglePlay(): void {
    this.isPlaying ? this.playerFacade.pause() : this.playerFacade.play();
  }
}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { VideoEntity } from 'src/app/models/video';
import { PlayerFacade } from 'src/app/stores/player/player.facade.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer:
    | ElementRef<HTMLVideoElement>
    | undefined;

  @Input() videos$: Observable<VideoEntity[]> = new Observable<VideoEntity[]>();

  isPlaying$ = this.playerFacade.isPlaying();

  constructor(readonly playerFacade: PlayerFacade) {}

  ngOnInit(): void {
    this.isPlaying$.subscribe((isPlaying) => {
      if (this.videoPlayer) {
        if (isPlaying) {
          this.videoPlayer.nativeElement.play();
        } else {
          this.videoPlayer.nativeElement.pause();
        }
      }
    });
  }
}

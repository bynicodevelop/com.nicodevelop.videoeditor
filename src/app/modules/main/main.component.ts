import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { VideoEntity } from 'src/app/models/video';
import { VideoFacade } from 'src/app/stores/videos/video.facade.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  videos$: Observable<VideoEntity[]> = this.videoFacade.getVideos();

  isReady: boolean = false;

  constructor(private videoFacade: VideoFacade) {}

  ngOnInit(): void {
    this.videos$.subscribe((videos): void => {
      this.isReady =
        videos.length > 0 && videos.every((video): boolean => !!video.audio);
    });
  }

  onUploadFile(files: File[]): void {
    this.videoFacade.uploadVideos(files);
  }
}

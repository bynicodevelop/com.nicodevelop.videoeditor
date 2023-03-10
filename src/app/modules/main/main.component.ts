import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { VideoEntity } from 'src/app/models/video';
import { VideoFacade } from 'src/app/stores/videos/video.facade.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  videos$: Observable<VideoEntity[]> = this.videoFacade.getVideos();

  isReady$: Observable<boolean> = this.videoFacade.videoLoaded();

  constructor(private videoFacade: VideoFacade) {}

  onUploadFile(files: File[]): void {
    this.videoFacade.uploadVideos(files);
  }
}

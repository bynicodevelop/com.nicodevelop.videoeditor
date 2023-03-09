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

  constructor(private videoFacade: VideoFacade) {}

  ngOnInit(): void {
    this.videos$.subscribe((videos) => console.log(videos));
  }

  onUploadFile(files: File[]): void {
    this.videoFacade.uploadVideos(files);
  }
}

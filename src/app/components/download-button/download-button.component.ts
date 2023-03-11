import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CutEntity } from 'src/app/models/cuts';
import { VideoEntity } from 'src/app/models/video';
import { CutsFacade } from 'src/app/stores/cuts/cuts.facade.service';
import { VideoFacade } from 'src/app/stores/videos/video.facade.service';

import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent implements OnInit {
  @Input() disabled = false;

  @Input() video?: VideoEntity;

  cuts$ = this.cutsFacade.getCuts();

  downloadableVideos$: Observable<VideoEntity[]> =
    this.videoFacade.downloadableVideos();

  faDownload = faDownload;

  constructor(
    private videoFacade: VideoFacade,
    private cutsFacade: CutsFacade
  ) {}

  ngOnInit(): void {
    this.downloadableVideos$.subscribe((videos): void => {
      for (const video of videos) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(video.output!);
        a.download = video.file.name;
        a.click();
      }
    });
  }

  onExportVideo(): void {
    // TODO: Error handling
    if (!this.video) return;

    this.cuts$
      .subscribe((cuts): void => {
        if (!cuts.length) {
          cuts.push({
            start: 0,
            end: this.video!.duration || 0,
          } as CutEntity);
        }

        this.videoFacade.exportVideo(this.video!, cuts);
      })
      .unsubscribe();
  }
}

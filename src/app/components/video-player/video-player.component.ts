import { Component, Input } from '@angular/core';

import { VideoEntity } from 'src/app/models/video';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  @Input() videos: VideoEntity[] | undefined | null;
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { DownloadButtonComponent } from 'src/app/components/download-button/download-button.component';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';
import { VideoPlayerComponent } from 'src/app/components/video-player/video-player.component';
import { SafeurlPipe } from 'src/app/pipes/safeurl.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    DropzoneComponent,
    VideoPlayerComponent,
    AudioPlayerComponent,
    SafeurlPipe,
    DownloadButtonComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, MainRoutingModule, FontAwesomeModule],
})
export class MainModule {}

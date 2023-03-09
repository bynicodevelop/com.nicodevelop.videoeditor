import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';
import { VideoPlayerComponent } from 'src/app/components/video-player/video-player.component';
import { SafeurlPipe } from 'src/app/pipes/safeurl.pipe';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    DropzoneComponent,
    VideoPlayerComponent,
    SafeurlPipe,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}

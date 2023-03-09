import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent, DropzoneComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}

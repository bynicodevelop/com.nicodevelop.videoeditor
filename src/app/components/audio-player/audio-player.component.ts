import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { VideoEntity } from 'src/app/models/video';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  @ViewChild('player') player!: ElementRef<HTMLDivElement>;

  @Input() videos!: VideoEntity[] | null;

  @Input() isReady$: Observable<boolean> = new Observable<boolean>();

  faMagnifyingGlassMinus = faMagnifyingGlassMinus;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  faWaveform = faWaveSquare;

  levelZoom: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  levelZoomMin = 0;

  levelZoomMax = 100;

  private wavesurfer?: WaveSurfer;

  ngOnInit(): void {
    this.isReady$.subscribe((isReady): void => {
      if (!isReady) return;

      const video = this.videos![0];

      this.wavesurfer?.load(URL.createObjectURL(video.file));
    });

    this.levelZoom.subscribe((levelZoom): void => {
      this.wavesurfer?.zoom(levelZoom);
    });
  }

  ngAfterViewInit(): void {
    this.wavesurfer = WaveSurfer.create({
      container: this.player.nativeElement,
      waveColor: 'violet',
      progressColor: 'purple',
      barHeight: 1,
      barWidth: 1,
      height: 100,
      plugins: [RegionsPlugin.create({})],
    });
  }

  onZoomIn(): void {
    if (this.levelZoom.value >= this.levelZoomMax) return;

    this.levelZoom.next(this.levelZoom.value + 10);
  }

  onZoomOut(): void {
    if (this.levelZoom.value <= this.levelZoomMin) return;

    this.levelZoom.next(this.levelZoom.value - 10);
  }
}

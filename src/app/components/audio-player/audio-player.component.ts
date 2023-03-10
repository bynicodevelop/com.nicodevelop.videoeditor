import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { RegionEntity } from 'src/app/models/region';
import { VideoEntity } from 'src/app/models/video';
import { PlayerFacade } from 'src/app/stores/player/player.facade.service';
import { RegionFacade } from 'src/app/stores/regions/region.facade.service';
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

  isPlaying$ = this.playerFacade.isPlaying();

  faMagnifyingGlassMinus = faMagnifyingGlassMinus;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  faWaveform = faWaveSquare;

  regions$ = this.regionFacade.getRegions();

  levelZoom$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  levelZoomMin = 0;

  levelZoomMax = 100;

  private wavesurfer?: WaveSurfer;

  regionUpdated$: BehaviorSubject<RegionEntity | null> =
    new BehaviorSubject<RegionEntity | null>(null);

  constructor(
    private regionFacade: RegionFacade,
    private playerFacade: PlayerFacade
  ) {}

  ngOnInit(): void {
    this.isReady$.subscribe((isReady): void => {
      if (!isReady) return;

      const video = this.videos![0];

      this.wavesurfer?.load(URL.createObjectURL(video.file));
    });

    this.levelZoom$.subscribe((levelZoom$): void => {
      this.wavesurfer?.zoom(levelZoom$);
    });

    this.isPlaying$.subscribe((isPlaying): void => {
      if (isPlaying) {
        this.wavesurfer?.play();
      } else {
        this.wavesurfer?.pause();
      }
    });
  }

  ngAfterViewInit(): void {
    this.wavesurfer = WaveSurfer.create({
      container: this.player.nativeElement,
      waveColor: '#CCC',
      // progressColor: 'purple',
      height: 100,
      plugins: [
        RegionsPlugin.create({
          dragSelection: true,
        }),
      ],
    });

    // listen to the region create event
    this.wavesurfer?.on('region-created', (region): void => {
      this.regionFacade.getRegion(region.id).subscribe((current): void => {
        if (current) return;

        this.regionFacade.addRegion({
          uid: region.id,
          start: region.start,
          end: region.end,
          duration: region.end - region.start,
        });
      });
    });

    this.wavesurfer?.on('region-updated', (region): void => {
      this.regionUpdated$.next({
        uid: region.id,
        start: region.start,
        end: region.end,
        duration: region.end - region.start,
      });
    });

    this.regionUpdated$.pipe(debounceTime(500)).subscribe((region): void => {
      if (!region) return;

      this.regionFacade.addRegion(region);
    });
  }

  onZoomIn(): void {
    if (this.levelZoom$.value >= this.levelZoomMax) return;

    this.levelZoom$.next(this.levelZoom$.value + 10);
  }

  onZoomOut(): void {
    if (this.levelZoom$.value <= this.levelZoomMin) return;

    this.levelZoom$.next(this.levelZoom$.value - 10);
  }
}

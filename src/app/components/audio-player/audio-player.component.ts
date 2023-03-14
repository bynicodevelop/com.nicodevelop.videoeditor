import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  BehaviorSubject,
  debounceTime,
  Observable,
} from 'rxjs';
import { OverlapType } from 'src/app/enums/overlay-type';
import { RegionEntity } from 'src/app/models/region';
import { VideoEntity } from 'src/app/models/video';
import { RegionService } from 'src/app/services/region.service';
import { CutsFacade } from 'src/app/stores/cuts/cuts.facade.service';
import { PlayerFacade } from 'src/app/stores/player/player.facade.service';
import { RegionFacade } from 'src/app/stores/regions/region.facade.service';
import { VideoFacade } from 'src/app/stores/videos/video.facade.service';
import { environment } from 'src/environments/environment';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/src/plugin/regions';

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
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('player') player!: ElementRef<HTMLDivElement>;

  @Input() videos!: VideoEntity[] | null;

  @Input() isReady$: Observable<boolean> = new Observable<boolean>();

  isPlaying$ = this.playerFacade.isPlaying();
  seek$ = this.playerFacade.getSeek();

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
    private playerFacade: PlayerFacade,
    private videoFacade: VideoFacade,
    private cutsFacade: CutsFacade,
    private regionService: RegionService
  ) {}

  ngOnInit(): void {
    this.isReady$.subscribe((isReady): void => {
      // TODO: Error handling
      if (!isReady || !this.videos) return;

      const video = this.videos[0];

      this.wavesurfer?.load(URL.createObjectURL(video.file));
    });

    this.levelZoom$.subscribe((levelZoom): void => {
      this.wavesurfer?.zoom(Number(levelZoom));
    });

    this.regions$.subscribe((regions): void => {
      if (regions.length === 0) return;

      this.cutsFacade.addRegions(regions, this.videos?.[0].duration || 0);
    });

    this.isPlaying$.subscribe((isPlaying): void => {
      if (isPlaying) {
        this.wavesurfer?.play();
      } else {
        this.wavesurfer?.pause();
      }
    });

    this.regionUpdated$.pipe(debounceTime(500)).subscribe((region): void => {
      if (!region) return;

      this.regionFacade.updateRegion(
        region,
        Object.values(this.wavesurfer?.regions.list || []).map(
          (region: Region): string => region.id
        )
      );
    });
  }

  ngAfterViewInit(): void {
    this.wavesurfer = WaveSurfer.create({
      container: this.player.nativeElement,
      waveColor: '#CCC',
      height: 100,
      plugins: [
        RegionsPlugin.create({
          dragSelection: true,
        }),
      ],
    });

    this.wavesurfer?.on('ready', (): void => {
      const video = this.videos?.[0];

      const updateVideo = {
        ...video,
        duration: this.wavesurfer?.getDuration() || 0,
      } as VideoEntity;
      this.videoFacade.updateVideo(updateVideo);
    });

    this.wavesurfer?.on('region-created', (region): void => {
      this.regionFacade
        .getRegion(region.id)
        .subscribe((current): void => {
          if (current) return;

          this.regionFacade.addRegion({
            uid: region.id,
            start: region.start,
            end: region.end,
            duration: region.end - region.start,
          });
        })
        .unsubscribe();
    });

    this.wavesurfer?.on('region-updated', (region: Region): void => {
      const overlaps = this.regionService.getOverlap(
        region,
        Object.values(this.wavesurfer?.regions.list || [])
      );

      const overlapsType = this.regionService.getOverlayType(region, overlaps);

      if (overlapsType === OverlapType.START_LEFT) {
        region.update({
          end: overlaps[0].start,
        });
      }

      if (overlapsType === OverlapType.ENCLOSES) {
        overlaps[0].remove();
      }

      if (overlapsType === OverlapType.START_RIGHT) {
        region.update({
          start: overlaps[0].end,
        });
      }

      if (
        Number(region.end.toFixed(1)) - Number(region.start.toFixed(1)) <
        environment.minimumDuration
      ) {
        region.remove();
      }

      this.regionUpdated$.next({
        uid: region.id,
        start: region.start,
        end: region.end,
        duration: region.end - region.start,
      });
    });

    this.wavesurfer?.on('seek', (time: number): void => {
      // TODO: Fix seek
      if (!this.wavesurfer) return;

      this.playerFacade.seek(time * this.wavesurfer.getDuration());
    });

    this.wavesurfer?.on('audioprocess', (time: number): void => {
      if (!this.wavesurfer) return;

      const regions = this.wavesurfer.regions.list;

      const region = Object.values(regions).find((region): boolean => {
        return region.start <= time && region.end >= time;
      });

      if (region) {
        this.wavesurfer.seekTo(region.end / this.wavesurfer.getDuration());
      }
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

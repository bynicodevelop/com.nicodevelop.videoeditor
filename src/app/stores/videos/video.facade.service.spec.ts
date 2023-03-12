import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { VideoEntity } from 'src/app/models/video';

import { Store, StoreModule } from '@ngrx/store';

import { VideoFacade } from './video.facade.service';
import { State } from './video.reducers';

describe('VideoFacadeService', () => {
  let service: VideoFacade;
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [VideoFacade],
    });
    service = TestBed.inject(VideoFacade);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVideos', () => {
    it('should return the videos from store', () => {
      const videos: VideoEntity[] = [
        { uid: '1', file: new File([''], 'video1.mp4') },
        { uid: '2', file: new File([''], 'video2.mp4') },
      ];
      spyOn(store, 'select').and.returnValue(of(videos));

      let result: VideoEntity[] | undefined;
      service.getVideos().subscribe((data) => (result = data));

      expect(result).toEqual(videos);
    });
  });

  describe('videoLoaded', () => {
    it('should return the value of videoReady selector from store', () => {
      const value = true;
      spyOn(store, 'select').and.returnValue(of(value));

      let result: boolean | undefined;
      service.videoLoaded().subscribe((data) => (result = data));

      expect(result).toEqual(value);
    });
  });
});

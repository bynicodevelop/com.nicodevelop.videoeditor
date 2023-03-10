import { TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';

import { VideoFacade } from './video.facade.service';

describe('VideoFacadeService', () => {
  let service: VideoFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
    });
    service = TestBed.inject(VideoFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

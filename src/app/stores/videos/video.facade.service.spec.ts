import { TestBed } from '@angular/core/testing';

import { VideoFacadeService } from './video.facade.service';

describe('VideoFacadeService', () => {
  let service: VideoFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

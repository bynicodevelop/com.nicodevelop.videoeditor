import { TestBed } from '@angular/core/testing';

import { FFmpegService } from './ffmpeg.service';

describe('FfmpegService', () => {
  let service: FFmpegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FFmpegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

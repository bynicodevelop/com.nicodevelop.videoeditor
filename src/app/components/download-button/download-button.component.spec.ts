import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { VideoEntity } from 'src/app/models/video';
import { VideoFacade } from 'src/app/stores/videos/video.facade.service';

import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { DownloadButtonComponent } from './download-button.component';

describe('DownloadButtonComponent', () => {
  let component: DownloadButtonComponent;
  let fixture: ComponentFixture<DownloadButtonComponent>;
  let videoFacade: VideoFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadButtonComponent],
      imports: [FontAwesomeTestingModule],
      providers: [
        {
          provide: VideoFacade,
          useValue: {
            downloadableVideos: jasmine.createSpy().and.returnValue(of([])),
            exportVideo: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadButtonComponent);
    component = fixture.componentInstance;
    videoFacade = TestBed.inject(VideoFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onExportVideo', () => {
    it('should call VideoFacade.exportVideo with video', () => {
      const video: VideoEntity = { uid: '1', file: new File([], 'video.mp4') };
      component.video = video;
      component.onExportVideo();
      expect(videoFacade.exportVideo).toHaveBeenCalledWith(video);
    });
  });
});

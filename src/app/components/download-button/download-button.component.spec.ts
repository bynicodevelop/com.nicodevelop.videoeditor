import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { CutsFacade } from 'src/app/stores/cuts/cuts.facade.service';
import { VideoFacade } from 'src/app/stores/videos/video.facade.service';

import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { ButtonComponent } from '../button/button.component';
import { DownloadButtonComponent } from './download-button.component';

describe('DownloadButtonComponent', (): void => {
  let component: DownloadButtonComponent;
  let fixture: ComponentFixture<DownloadButtonComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [DownloadButtonComponent, ButtonComponent],
      imports: [FontAwesomeTestingModule],
      providers: [
        {
          provide: VideoFacade,
          useValue: {
            downloadableVideos: jasmine.createSpy().and.returnValue(of([])),
            exportVideo: jasmine.createSpy(),
          },
        },
        {
          provide: CutsFacade,
          useValue: {
            addCut: jasmine.createSpy(),
            getCuts: jasmine.createSpy().and.returnValue(of([])),
            addRegions: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(DownloadButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';
import { DropzoneComponent } from 'src/app/components/dropzone/dropzone.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, DropzoneComponent, AudioPlayerComponent],
      imports: [StoreModule.forRoot({}), FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

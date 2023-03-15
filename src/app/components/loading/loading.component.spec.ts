import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

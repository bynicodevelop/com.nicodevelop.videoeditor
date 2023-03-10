import { TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';

import { CutsFacade } from './cuts.facade.service';

describe('CutsFacade', () => {
  let service: CutsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
    });
    service = TestBed.inject(CutsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

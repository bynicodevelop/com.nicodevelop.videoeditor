import { TestBed } from '@angular/core/testing';

import { CutsFacade } from './cuts.facade.service';

describe('CutsFacade', () => {
  let service: CutsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegionFacadeService } from './region.facade.service';

describe('RegionFacadeService', () => {
  let service: RegionFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

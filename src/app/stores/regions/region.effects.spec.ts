import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RegionEffects } from './region.effects';

describe('RegionEffects', () => {
  let actions$: Observable<any>;
  let effects: RegionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RegionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

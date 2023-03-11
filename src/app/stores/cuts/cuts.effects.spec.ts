import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CutsEffects } from './cuts.effects';

describe('CutsEffects', () => {
  let actions$: Observable<any>;
  let effects: CutsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CutsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CutsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

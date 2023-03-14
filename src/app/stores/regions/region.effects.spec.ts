import { TestBed } from '@angular/core/testing';

import {
  Observable,
  of,
} from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';

import { RegionEffects } from './region.effects';

describe('RegionEffects', () => {
  let actions$: Observable<any>;
  let effects: RegionEffects;

  beforeEach(() => {
    const initialState = {};

    TestBed.configureTestingModule({
      providers: [
        RegionEffects,
        provideMockActions((): Observable<any> => actions$),
        {
          provide: Store,
          useValue: {
            select: () => of(initialState),
            pipe: () => of(null),
          },
        },
      ],
    });

    effects = TestBed.inject(RegionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

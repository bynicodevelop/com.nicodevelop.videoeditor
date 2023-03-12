import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';
import { RegionEntity } from 'src/app/models/region';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { addCuts, convertRegion } from './cuts.actions';
import { CutsEffects } from './cuts.effects';

describe('CutsEffects', () => {
  let actions$: Observable<any>;
  let effects: CutsEffects;

  beforeEach(() => {
    const actionsMock = jasmine.createSpyObj('Actions', ['pipe']);
    TestBed.configureTestingModule({
      providers: [
        CutsEffects,
        { provide: Actions, useValue: actionsMock },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(CutsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('Should return empty array of cuts (1)', () => {
    const regions = [
      {
        uid: 'region-1',
        start: 1,
        end: 3,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer) => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action) => {
      console.log(action);

      expect(action).toEqual(
        addCuts({
          cuts: [
            { uid: 'cut-1', start: 0, end: 1 },
            { uid: 'cut-2', start: 3, end: 10 },
          ],
        })
      );
    });
  });

  it('Should return empty array of cuts (2)', () => {
    const regions = [
      {
        uid: 'region-1',
        start: 0,
        end: 3,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer) => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action) => {
      console.log(action);

      expect(action).toEqual(
        addCuts({
          cuts: [{ uid: 'cut-1', start: 3, end: 10 }],
        })
      );
    });
  });

  it('Should return empty array of cuts (3)', () => {
    const regions = [
      {
        uid: 'region-1',
        start: 8,
        end: 10,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer) => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action) => {
      console.log(action);

      expect(action).toEqual(
        addCuts({
          cuts: [{ uid: 'cut-1', start: 0, end: 8 }],
        })
      );
    });
  });

  it('Should return empty array of cuts (4)', () => {
    const regions = [
      {
        uid: 'region-1',
        start: 0.2,
        end: 3,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer) => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action) => {
      console.log(action);

      expect(action).toEqual(
        addCuts({
          cuts: [{ uid: 'cut-1', start: 3, end: 10 }],
        })
      );
    });
  });
});

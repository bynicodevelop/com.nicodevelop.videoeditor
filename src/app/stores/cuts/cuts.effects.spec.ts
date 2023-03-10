import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';
import { RegionEntity } from 'src/app/models/region';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  Store,
  StoreModule,
} from '@ngrx/store';

import {
  addCuts,
  convertRegion,
} from './cuts.actions';
import { CutsEffects } from './cuts.effects';
import { State } from './cuts.reducer';

describe('CutsEffects', (): void => {
  let actions$: Observable<any>;
  let effects: CutsEffects;
  let store: Store<State>;

  beforeEach((): void => {
    const actionsMock = jasmine.createSpyObj('Actions', ['pipe']);
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        CutsEffects,
        { provide: Actions, useValue: actionsMock },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(CutsEffects);
    store = TestBed.inject(Store<State>);
  });

  it('should be created', (): void => {
    expect(effects).toBeTruthy();
  });

  it('Should return empty array of cuts (1)', (): void => {
    const regions = [
      {
        uid: 'region-1',
        start: 1,
        end: 3,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
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

  it('Should return empty array of cuts (2)', (): void => {
    const regions = [
      {
        uid: 'region-1',
        start: 0,
        end: 3,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
      expect(action).toEqual(
        addCuts({
          cuts: [{ uid: 'cut-1', start: 3, end: 10 }],
        })
      );
    });
  });

  it('Should return empty array of cuts (3)', (): void => {
    const regions = [
      {
        uid: 'region-1',
        start: 8,
        end: 10,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
      expect(action).toEqual(
        addCuts({
          cuts: [{ uid: 'cut-1', start: 0, end: 8 }],
        })
      );
    });
  });

  it('Should return empty array of cuts (4)', (): void => {
    const regions = [
      {
        uid: 'region-1',
        start: 1,
        end: 3,
        duration: 2,
      } as RegionEntity,
      {
        uid: 'region-2',
        start: 5,
        end: 8,
        duration: 3,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
      expect(action).toEqual(
        addCuts({
          cuts: [
            { uid: 'cut-1', start: 0, end: 1 },
            { uid: 'cut-2', start: 3, end: 5 },
            { uid: 'cut-3', start: 8, end: 10 },
          ],
        })
      );
    });
  });

  it('Should return empty array of cuts (5)', (): void => {
    const regions = [
      {
        uid: 'region-1',
        start: 1,
        end: 3,
        duration: 2,
      } as RegionEntity,
      {
        uid: 'region-2',
        start: 4,
        end: 6,
        duration: 2,
      } as RegionEntity,
      {
        uid: 'region-3',
        start: 8,
        end: 9,
        duration: 1,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
      expect(action).toEqual(
        addCuts({
          cuts: [
            { uid: 'cut-1', start: 0, end: 1 },
            { uid: 'cut-2', start: 3, end: 4 },
            { uid: 'cut-3', start: 6, end: 8 },
            { uid: 'cut-4', start: 9, end: 10 },
          ],
        })
      );
    });
  });

  it('Should return empty array of cuts (6)', (): void => {
    const regions = [
      {
        uid: 'region-1',
        start: 1,
        end: 3,
        duration: 2,
      } as RegionEntity,
      {
        uid: 'region-3',
        start: 8,
        end: 9,
        duration: 1,
      } as RegionEntity,
      {
        uid: 'region-2',
        start: 4,
        end: 6,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
      expect(action).toEqual(
        addCuts({
          cuts: [
            { uid: 'cut-1', start: 0, end: 1 },
            { uid: 'cut-2', start: 3, end: 4 },
            { uid: 'cut-3', start: 6, end: 8 },
            { uid: 'cut-4', start: 9, end: 10 },
          ],
        })
      );
    });
  });

  it('Should return empty array of cuts (7)', (): void => {
    const regions = [
      {
        uid: 'region-1',
        start: 0.2,
        end: 3,
        duration: 2,
      } as RegionEntity,
    ];

    const duration = 10;

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
      expect(action).toEqual(
        addCuts({
          cuts: [{ uid: 'cut-1', start: 3, end: 10 }],
        })
      );
    });
  });

  it('Should return empty array of cuts (8)', (): void => {
    const regions = [] as RegionEntity[];

    const duration = 10;

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
      expect(action).toEqual(
        addCuts({
          cuts: [],
        })
      );
    });
  });

  it('Should return empty array of cuts (9)', (): void => {
    const initialCuts = [
      { uid: 'cut-1', start: 0, end: 1 },
      { uid: 'cut-2', start: 3, end: 10 },
    ];

    const regions = [] as RegionEntity[];

    const duration = 10;

    store.dispatch(
      addCuts({
        cuts: initialCuts,
      })
    );

    actions$ = new Observable((observer): void => {
      observer.next(convertRegion({ regions, duration }));
    });

    effects.addRegion$.subscribe((action): void => {
      expect(action).toEqual(
        addCuts({
          cuts: [],
        })
      );
    });
  });
});

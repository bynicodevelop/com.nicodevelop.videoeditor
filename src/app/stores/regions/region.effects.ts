import { Injectable } from '@angular/core';

import { map, withLatestFrom } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { setRegions, updateRegion } from './region.actions';
import { State } from './region.reducer';
import { getRegions } from './region.selectors';

@Injectable()
export class RegionEffects {
  constructor(private actions$: Actions, private store$: Store<State>) {}

  updateRegion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRegion),
      withLatestFrom(this.store$.select(getRegions)),
      map(([action, regions]) => {
        const regionsId = action.regionsId;

        const regionsAConcerver = regions.filter((region): boolean =>
          regionsId.includes(region.uid)
        );

        return setRegions({ regions: regionsAConcerver });
      })
    );
  });
}

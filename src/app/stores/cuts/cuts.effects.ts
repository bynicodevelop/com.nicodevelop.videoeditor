import { Injectable } from '@angular/core';

import { filter, map } from 'rxjs';
import { CutEntity } from 'src/app/models/cuts';
import { RegionEntity } from 'src/app/models/region';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { addCuts, convertRegion } from './cuts.actions';

@Injectable()
export class CutsEffects {
  constructor(private actions$: Actions) {}

  addRegion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(convertRegion),
      filter(({ regions }): boolean => {
        const result = regions.filter(
          (region): boolean => region.start !== 0 && region.end !== 0
        );

        return result.length === regions.length;
      }),
      map(({ regions, duration }): CutEntity[] =>
        (regions as RegionEntity[]).reduce(
          (cuts, region, index): CutEntity[] => {
            if (index === 0 && region.start !== 0) {
              cuts.push({
                uid: `cut-${cuts.length + 1}`,
                start: 0,
                end: region.start,
              });
            }
            if (regions[index + 1]) {
              cuts.push({
                uid: `cut-${cuts.length + 1}`,
                start: region.end,
                end: regions[index + 1].start,
              });
            } else {
              cuts.push({
                uid: `cut-${cuts.length + 1}`,
                start: region.end,
                end: duration,
              });
            }

            return cuts;
          },
          [] as CutEntity[]
        )
      ),
      map((cuts) => addCuts({ cuts }))
    );
  });
}

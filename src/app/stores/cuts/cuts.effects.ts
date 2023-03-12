import { Injectable } from '@angular/core';

import { filter, map, tap } from 'rxjs';
import { CutEntity } from 'src/app/models/cuts';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { addCuts, convertRegion } from './cuts.actions';

const MIN_CUT_DURATION = 0.3;

@Injectable()
export class CutsEffects {
  constructor(private actions$: Actions) {}

  addRegion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(convertRegion),
      filter(({ regions }): boolean =>
        regions.every((region) => region.start !== 0 && region.end !== 0)
      ),
      map(({ regions, duration }) => {
        if (regions.length === 1 && regions[0].start < MIN_CUT_DURATION) {
          return {
            regions: [{ ...regions[0], start: 0 }],
            duration,
          };
        }
        return { regions, duration };
      }),
      map(({ regions, duration }): CutEntity[] => {
        const cuts: CutEntity[] = [];

        if (regions[0].start > 0) {
          cuts.push({
            uid: `cut-${cuts.length + 1}`,
            start: 0,
            end: regions[0].start,
          });
        }

        for (let i = 0; i < regions.length; i++) {
          const region = regions[i];
          const nextRegion = regions[i + 1];

          if (region.start < MIN_CUT_DURATION) {
            region.start = region.end;
          }

          if (nextRegion && region.end < nextRegion.start) {
            cuts.push({
              uid: `cut-${cuts.length + 1}`,
              start: region.end,
              end: nextRegion.start,
            });
          } else if (!nextRegion && region.end < duration) {
            cuts.push({
              uid: `cut-${cuts.length + 1}`,
              start: region.end,
              end: duration,
            });
          }
        }

        return cuts;
      }),
      tap(console.log),
      map((cuts) => addCuts({ cuts }))
    );
  });
}

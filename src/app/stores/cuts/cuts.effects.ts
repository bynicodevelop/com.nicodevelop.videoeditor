import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { CutEntity } from 'src/app/models/cuts';

import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';

import {
  addCuts,
  convertRegion,
} from './cuts.actions';

const MIN_CUT_DURATION = 0.3;

@Injectable()
export class CutsEffects {
  constructor(private actions$: Actions) {}

  addRegion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(convertRegion),
      map(({ regions, duration }) => ({
        regions: regions.filter(
          (region): boolean => region.end !== region.start
        ),
        duration,
      })),
      map(({ regions, duration }) => {
        if (regions.length === 1 && regions[0].start < MIN_CUT_DURATION) {
          return {
            regions: [{ ...regions[0], start: 0 }],
            duration,
          };
        }

        return { regions, duration };
      }),
      map(({ regions, duration }) => ({
        regions: regions.slice().sort((a, b): number => a.start - b.start),
        duration,
      })),
      map(({ regions, duration }): CutEntity[] => {
        const cuts: CutEntity[] = [];

        if (regions.length > 0 && regions[0].start > 0) {
          cuts.push({
            uid: `cut-${cuts.length + 1}`,
            start: 0,
            end: regions[0].start,
          });
        }

        for (let i = 0; i < regions.length; i++) {
          const region = regions[i];
          const nextRegion = regions[i + 1];

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
      map((cuts): CutEntity[] =>
        cuts.filter((cut): boolean => cut.end !== cut.start)
      ),
      map((cuts) => addCuts({ cuts }))
    );
  });
}

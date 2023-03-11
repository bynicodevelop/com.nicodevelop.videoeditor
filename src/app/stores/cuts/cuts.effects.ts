import { Injectable } from '@angular/core';

import { filter, map } from 'rxjs';
import { CutEntity } from 'src/app/models/cuts';

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
      map(({ regions, duration }): CutEntity[] => {
        const cuts: CutEntity[] = [];

        // Add a "silent" region if the first region doesn't start at 0
        if (regions[0].start > 0) {
          cuts.push({
            uid: `cut-${cuts.length + 1}`,
            start: 0,
            end: regions[0].start,
          });
        }

        // Iterate over the regions and create cuts as needed
        for (let i = 0; i < regions.length; i++) {
          const region = regions[i];
          const nextRegion = regions[i + 1];

          if (nextRegion && region.end < nextRegion.start) {
            // Create a cut between the current region and the next one
            cuts.push({
              uid: `cut-${cuts.length + 1}`,
              start: region.end,
              end: nextRegion.start,
            });
          } else if (!nextRegion && region.end < duration) {
            // Create a cut between the last region and the end of the track
            cuts.push({
              uid: `cut-${cuts.length + 1}`,
              start: region.end,
              end: duration,
            });
          }
        }

        return cuts;
      }),
      map((cuts) => addCuts({ cuts }))
    );
  });
}

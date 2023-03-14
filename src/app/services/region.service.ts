import { Injectable } from '@angular/core';

import { Region } from 'wavesurfer.js/src/plugin/regions';

import { OverlapType } from '../enums/overlay-type';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor() {}

  getOverlap(region: Region, regions: Region[]): Region[] {
    return regions.filter(
      (r): boolean =>
        r !== region && region.start < r.end && region.end > r.start
    );
  }

  getOverlayType(region: Region, overlaps: Region[]): OverlapType {
    let overlapsType = OverlapType.NONE;

    if (overlaps.length > 0) {
      overlaps.forEach((r): void => {
        // Dans le cas ou le chevauchement est au début
        if (
          region.end < r.end &&
          region.end > r.start &&
          region.start < r.start
        ) {
          overlapsType = OverlapType.START_LEFT;

          return;
        }

        // Dans le cas ou le chevauchement est à la fin
        if (
          region.start > r.start &&
          region.start < r.end &&
          region.end > r.end
        ) {
          overlapsType = OverlapType.START_RIGHT;

          return;
        }

        // Dans le cas ou le chevauchement enveloppe
        if (region.start < r.start && region.end > r.end) {
          overlapsType = OverlapType.ENCLOSES;

          return;
        }
      });
    }

    return overlapsType;
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RegionEntity } from 'src/app/models/region';

import { Store } from '@ngrx/store';

import {
  addRegion,
  removeRegionByUid,
  updateRegion,
} from './region.actions';
import { State } from './region.reducer';
import {
  getRegionById,
  getRegions,
  hasSelectedRegions,
} from './region.selectors';

@Injectable({
  providedIn: 'root',
})
export class RegionFacade {
  constructor(private store: Store<State>) {}

  getRegions(): Observable<RegionEntity[]> {
    return this.store.select(getRegions);
  }

  getRegion(id: string): Observable<RegionEntity | undefined> {
    return this.store.select(getRegionById(id));
  }

  addRegion(region: RegionEntity): void {
    this.store.dispatch(addRegion({ region }));
  }

  updateRegion(region: RegionEntity, regionsId: string[]): void {
    this.store.dispatch(updateRegion({ region, regionsId }));
  }

  removeRegion(id: string): void {
    this.store.dispatch(removeRegionByUid({ uid: id }));
  }

  hasSelectedRegions(): Observable<boolean> {
    return this.store.select(hasSelectedRegions);
  }
}

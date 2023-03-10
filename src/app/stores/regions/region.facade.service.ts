import { Injectable } from '@angular/core';

import { RegionEntity } from 'src/app/models/region';

import { Store } from '@ngrx/store';

import { addRegion, updateRegion } from './region.actions';
import { State } from './region.reducer';

@Injectable({
  providedIn: 'root',
})
export class RegionFacade {
  constructor(private store: Store<State>) {}

  addRegion(region: RegionEntity): void {
    this.store.dispatch(addRegion({ region }));
  }

  updateRegion(region: RegionEntity): void {
    this.store.dispatch(updateRegion({ region }));
  }
}

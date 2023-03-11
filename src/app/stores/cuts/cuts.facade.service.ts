import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CutEntity } from 'src/app/models/cuts';
import { RegionEntity } from 'src/app/models/region';

import { Store } from '@ngrx/store';

import { addCuts, convertRegion } from './cuts.actions';
import { State } from './cuts.reducer';
import { selectCuts } from './cuts.selectors';

@Injectable({
  providedIn: 'root',
})
export class CutsFacade {
  constructor(private store: Store<State>) {}

  addCut(cuts: CutEntity[]): void {
    this.store.dispatch(addCuts({ cuts }));
  }

  getCuts(): Observable<CutEntity[]> {
    return this.store.select(selectCuts);
  }

  addRegions(regions: RegionEntity[], duration: number): void {
    this.store.dispatch(convertRegion({ regions, duration }));
  }
}

import { RegionEntity } from 'src/app/models/region';

import {
  createEntityAdapter,
  EntityState,
} from '@ngrx/entity';
import {
  createReducer,
  on,
} from '@ngrx/store';

import {
  addRegion,
  removeRegionByUid,
  setRegions,
  updateRegion,
} from './region.actions';

export const regionFeatureKey = 'region';

export type State = EntityState<RegionEntity>;

export const regionAdapter = createEntityAdapter<RegionEntity>({
  selectId: (region: RegionEntity): string => region.uid,
});

export const initialState: State = regionAdapter.getInitialState();

export const regionReducer = createReducer(
  initialState,
  on(
    setRegions,
    (state, { regions }): State => regionAdapter.setAll(regions, state)
  ),
  on(
    addRegion,
    (state, { region }): State => regionAdapter.addOne(region, state)
  ),
  on(
    updateRegion,
    (state, { region }): State =>
      regionAdapter.updateOne(
        {
          id: region.uid,
          changes: region,
        },
        state
      )
  ),
  on(
    removeRegionByUid,
    (state, { uid }): State => regionAdapter.removeOne(uid, state)
  )
);

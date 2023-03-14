import { RegionEntity } from 'src/app/models/region';

import { createAction, props } from '@ngrx/store';

export const loadRegions = createAction('[Region] Load Regions');

export const loadRegionsSuccess = createAction(
  '[Region] Load Regions Success',
  props<{ data: any }>()
);

export const setRegions = createAction(
  '[Region] Set Regions',
  props<{ regions: RegionEntity[] }>()
);

export const addRegion = createAction(
  '[Region] Add Region',
  props<{ region: RegionEntity }>()
);

export const updateRegion = createAction(
  '[Region] Update Region',
  props<{ region: RegionEntity; regionsId: string[] }>()
);

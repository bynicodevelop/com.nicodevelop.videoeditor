import { CutEntity } from 'src/app/models/cuts';
import { RegionEntity } from 'src/app/models/region';

import { createAction, props } from '@ngrx/store';

export const addCuts = createAction(
  '[Cut] Add Cuts',
  props<{ cuts: CutEntity[] }>()
);

export const convertRegion = createAction(
  '[Cut] Convert Region',
  props<{ regions: RegionEntity[]; duration: number }>()
);

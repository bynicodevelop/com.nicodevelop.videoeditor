import { CutEntity } from 'src/app/models/cuts';

import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { addCuts } from './cuts.actions';

export const cutsFeatureKey = 'cuts';

export type State = EntityState<CutEntity>;

export const cutsAdapter = createEntityAdapter<CutEntity>({
  selectId: (cut: CutEntity): string => cut.uid,
});

export const initialState: State = cutsAdapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(addCuts, (state, { cuts }): State => cutsAdapter.setAll(cuts, state))
);

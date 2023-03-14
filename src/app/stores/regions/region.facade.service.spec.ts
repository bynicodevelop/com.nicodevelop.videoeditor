import { TestBed } from '@angular/core/testing';

import { RegionEntity } from 'src/app/models/region';

import {
  Store,
  StoreModule,
} from '@ngrx/store';

import {
  addRegion,
  updateRegion,
} from './region.actions';
import { RegionFacade } from './region.facade.service';

describe('RegionFacade', () => {
  let service: RegionFacade;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [RegionFacade],
    });

    service = TestBed.inject(RegionFacade);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch addRegion action', () => {
    const region: RegionEntity = {
      uid: '1',
      start: 0,
      end: 10,
      duration: 10,
    };

    spyOn(store, 'dispatch');
    service.addRegion(region);

    expect(store.dispatch).toHaveBeenCalledWith(addRegion({ region }));
  });

  it('should dispatch updateRegion action', () => {
    const region: RegionEntity = {
      uid: '1',
      start: 0,
      end: 10,
      duration: 10,
    };

    spyOn(store, 'dispatch');
    service.updateRegion(region, []);

    expect(store.dispatch).toHaveBeenCalledWith(
      updateRegion({ region, regionsId: [] })
    );
  });
});

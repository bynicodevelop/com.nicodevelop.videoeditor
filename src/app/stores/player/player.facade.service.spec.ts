import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { Store, StoreModule } from '@ngrx/store';

import { pause, play } from './player.actions';
import { PlayerFacade } from './player.facade.service';
import { StatePlayer } from './player.reducer';

describe('PlayerFacade', () => {
  let service: PlayerFacade;
  let store: Store<StatePlayer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [PlayerFacade],
    });
    store = TestBed.inject(Store);
    service = TestBed.inject(PlayerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should dispatch 'play' action on play()", () => {
    const spy = spyOn(store, 'dispatch');
    service.play();
    expect(spy).toHaveBeenCalledWith(play());
  });

  it("should dispatch 'pause' action on pause()", () => {
    const spy = spyOn(store, 'dispatch');
    service.pause();
    expect(spy).toHaveBeenCalledWith(pause());
  });

  it("should return the 'isPlaying' observable", () => {
    const isPlaying$: Observable<boolean> = of(true);
    spyOn(store, 'select').and.returnValue(isPlaying$);
    expect(service.isPlaying()).toBe(isPlaying$);
  });
});

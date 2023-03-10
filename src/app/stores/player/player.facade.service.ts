import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { pause, play } from './player.actions';
import { StatePlayer } from './player.reducer';
import { isPlaying } from './player.selectors';

@Injectable({
  providedIn: 'root',
})
export class PlayerFacade {
  constructor(private store: Store<StatePlayer>) {}

  play(): void {
    this.store.dispatch(play());
  }

  pause(): void {
    this.store.dispatch(pause());
  }

  isPlaying(): Observable<boolean> {
    return this.store.select(isPlaying);
  }
}

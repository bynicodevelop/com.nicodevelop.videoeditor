import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { pause, play, seek } from './player.actions';
import { StatePlayer } from './player.reducer';
import { getSeek, isPlaying } from './player.selectors';

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

  seek(time: number): void {
    this.store.dispatch(seek({ time }));
  }

  getSeek(): Observable<number> {
    return this.store.select(getSeek);
  }

  isPlaying(): Observable<boolean> {
    return this.store.select(isPlaying);
  }
}

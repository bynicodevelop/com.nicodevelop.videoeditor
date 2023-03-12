import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CutsEffects } from './stores/cuts/cuts.effects';
import * as fromCut from './stores/cuts/cuts.reducer';
import * as fromPlayer from './stores/player/player.reducer';
import { RegionEffects } from './stores/regions/region.effects';
import * as fromRegion from './stores/regions/region.reducer';
import { VideoEffects } from './stores/videos/video.effects';
import * as fromVideo from './stores/videos/video.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        [fromVideo.videoFeatureKey]: fromVideo.videoReducer,
        [fromRegion.regionFeatureKey]: fromRegion.regionReducer,
        [fromPlayer.playerFeatureKey]: fromPlayer.playerReducer,
        [fromCut.cutsFeatureKey]: fromCut.reducer,
      },
      {
        runtimeChecks: {
          strictActionTypeUniqueness: true,
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([VideoEffects, RegionEffects, CutsEffects]),
    EffectsModule.forFeature([VideoEffects, RegionEffects, CutsEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Video editor',
      logOnly: isDevMode(),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

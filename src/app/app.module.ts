import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoEffects } from './stores/videos/video.effects';
import * as fromVideo from './stores/videos/video.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        [fromVideo.videoFeatureKey]: fromVideo.videoReducers,
      },
      {
        runtimeChecks: {
          strictActionTypeUniqueness: true,
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreModule.forFeature(fromVideo.videoFeatureKey, fromVideo.videoReducers, {
      metaReducers: [...fromVideo.videoMetaReducers],
    }),
    EffectsModule.forRoot([VideoEffects]),
    EffectsModule.forFeature([VideoEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Video editor',
      logOnly: isDevMode(),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

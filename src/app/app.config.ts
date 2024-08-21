import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNgIconsConfig } from '@ng-icons/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getAllProviders } from '@/app/core/factories/providers';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@/environments/environment.development';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { stateProviders } from '@/app/presenter/state';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgIconsConfig({
      size: '2rem',
    }),
    provideAnimationsAsync(),
    ...getAllProviders,
    importProvidersFrom(
      NgxsModule.forRoot(stateProviders, {
        developmentMode: !environment.production,
      })
    ),
    importProvidersFrom(
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: environment.production,
      })
    ),
    LeafletModule,
  ],
};

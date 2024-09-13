import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    /*
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    */
    provideRouter(routes), 
    provideHttpClient(withFetch()),
  ]
};

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideConfig } from '@eac-arch/infrastructure-config';
import { provideSecurity, authInterceptor } from '@eac-arch/infrastructure-security';
import { provideGlobalDateFormat } from '@eac-arch/ui-kit';
import { provideModules } from '../providers';

import { routes } from '../../ui/main/routes/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideConfig(),
    provideSecurity(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideModules(),
    provideGlobalDateFormat(),
  ],
};

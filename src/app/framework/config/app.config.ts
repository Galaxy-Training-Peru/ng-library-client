import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideConfig } from '@eac-arch/infrastructure-config';
import { provideSecurity, authInterceptor } from '@eac-arch/infrastructure-security';
import { httpErrorInterceptor, provideErrorHandling } from '@eac-arch/infrastructure-http';
import { provideGlobalDateFormat, loadingInterceptor, provideNotifications } from '@eac-arch/ui-kit';
import { provideModules } from '../providers';

import { routes } from '../../ui/main/routes/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideConfig(),
    provideSecurity(),
    provideHttpClient(withFetch(), withInterceptors([httpErrorInterceptor, loadingInterceptor, authInterceptor])),
    provideModules(),
    provideGlobalDateFormat(),
    provideErrorHandling(),
    provideNotifications(),
  ],
};
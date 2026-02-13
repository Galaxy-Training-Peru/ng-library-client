
import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { prefetchConfig, providePreloadedConfig } from '@eac-arch/infrastructure-config';

import { appConfig } from './app/framework/config';
import { App } from './app/ui/main/shell';
import { environment } from './environments/environment';

console.log('[BOOT] Starting application with environment', environment);

prefetchConfig(environment.configFile)
  .then(preloadedConfig =>
    bootstrapApplication(App, mergeApplicationConfig(
      { providers: [providePreloadedConfig(preloadedConfig)] },
      appConfig,
    )),
  )
  .catch(err => console.error('[BOOT] bootstrap error', err));

import { bootstrapApplication } from '@angular/platform-browser';
import { prefetchConfig, providePreloadedConfig } from '@eac-arch/infrastructure-config';

import { appConfig } from './app/framework/config';
import { App } from './app/ui/main/shell';
import { environment } from './environments/environment';

prefetchConfig(environment.configFile)
  .then(preloadedConfig =>
    bootstrapApplication(App, {
      ...appConfig,
      providers: [
        providePreloadedConfig(preloadedConfig),
        ...(appConfig.providers ?? []),
      ],
    }),
  )
  .catch(err => console.error('[BOOT] bootstrap error', err));

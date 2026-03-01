import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideAuthorsModule } from 'library-authors';
import { provideCatalogModule } from 'library-catalog';

export function provideModules(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideCatalogModule(),
    provideAuthorsModule(),
  ]);
}

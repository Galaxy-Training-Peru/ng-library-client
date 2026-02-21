import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideAuthorsModule } from 'library-authors';

export function provideModules(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAuthorsModule(),
  ]);
}

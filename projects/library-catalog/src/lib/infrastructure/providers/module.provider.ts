import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideApplication } from './application.provider';
import { provideInfrastructure } from './infrastructure.provider';

export function provideCatalogModule(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...provideApplication(),
    ...provideInfrastructure(),
  ]);
}

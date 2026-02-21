import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideInfrastructure } from './infrastructure.provider';

export function provideAuthorsModule(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...provideInfrastructure(),
  ]);
}

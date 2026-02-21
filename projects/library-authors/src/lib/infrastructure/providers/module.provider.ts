import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideApplication } from './application.provider';
import { provideInfrastructure } from './infrastructure.provider';

export function provideAuthorsModule(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...provideApplication(),
    ...provideInfrastructure(),
  ]);
}

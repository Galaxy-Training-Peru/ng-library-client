import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideLiteraryGenreAgent, providePublisherAgent } from 'library-catalog';
import { provideAuthorAgent } from 'library-authors';

export function provideAgents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideLiteraryGenreAgent(),
    providePublisherAgent(),
    provideAuthorAgent(),
  ]);
}

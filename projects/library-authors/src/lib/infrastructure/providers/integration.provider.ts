import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { AUTHOR_AGENT } from 'library-integration';
import { AuthorAgentInProcessImpl } from '../integration';

export function provideAuthorAgent(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AUTHOR_AGENT, useClass: AuthorAgentInProcessImpl },
  ]);
}

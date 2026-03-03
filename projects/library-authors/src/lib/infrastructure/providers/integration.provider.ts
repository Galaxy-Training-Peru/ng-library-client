import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { AUTHOR_AGENT } from 'library-integration';
import { AuthorAgentInProcessImpl } from '../integration';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function provideAuthorAgent(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...provideTracedClass(AuthorAgentInProcessImpl, 'integration.agent-impl.author'),
    {
      provide: AUTHOR_AGENT,
      useExisting: AuthorAgentInProcessImpl,
    },
  ]);
}

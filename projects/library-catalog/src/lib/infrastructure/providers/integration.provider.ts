import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { LITERARY_GENRE_AGENT, PUBLISHER_AGENT } from 'library-integration';
import { LiteraryGenreAgentInProcessImpl, PublisherAgentInProcessImpl } from '../integration';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function provideLiteraryGenreAgent(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...provideTracedClass(
      LiteraryGenreAgentInProcessImpl,
      'integration.agent-impl.literary-genre',
    ),
    {
      provide: LITERARY_GENRE_AGENT,
      useExisting: LiteraryGenreAgentInProcessImpl,
    },
  ]);
}

export function providePublisherAgent(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...provideTracedClass(PublisherAgentInProcessImpl, 'integration.agent-impl.publisher'),
    {
      provide: PUBLISHER_AGENT,
      useExisting: PublisherAgentInProcessImpl,
    },
  ]);
}

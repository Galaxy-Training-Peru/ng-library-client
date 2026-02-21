import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { LITERARY_GENRE_AGENT, PUBLISHER_AGENT } from 'library-integration';
import { LiteraryGenreAgentInProcessImpl, PublisherAgentInProcessImpl } from '../integration';

export function provideLiteraryGenreAgent(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: LITERARY_GENRE_AGENT, useClass: LiteraryGenreAgentInProcessImpl },
  ]);
}

export function providePublisherAgent(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: PUBLISHER_AGENT, useClass: PublisherAgentInProcessImpl },
  ]);
}

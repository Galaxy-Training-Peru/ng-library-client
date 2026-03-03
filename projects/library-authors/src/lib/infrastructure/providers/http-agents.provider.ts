import { Provider, Type } from '@angular/core';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';
import {
  AuthorsHttpAgent,
  PapersHttpAgent,
  AwardsHttpAgent,
  AffiliationsHttpAgent,
} from '../http-agents';

const HTTP_AGENT_TYPES: Array<Type<object>> = [
  AuthorsHttpAgent,
  PapersHttpAgent,
  AwardsHttpAgent,
  AffiliationsHttpAgent,
];

export function provideHttpAgents(): Provider[] {
  return HTTP_AGENT_TYPES.flatMap((type) =>
    provideTracedClass(type, 'infrastructure.http-agent.authors'),
  );
}

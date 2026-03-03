import { Provider, Type } from '@angular/core';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';
import { LiteraryGenresHttpAgent, PublishersHttpAgent } from '../http-agents';

const HTTP_AGENT_TYPES: Array<Type<object>> = [
  LiteraryGenresHttpAgent,
  PublishersHttpAgent,
];

export function provideHttpAgents(): Provider[] {
  return HTTP_AGENT_TYPES.flatMap((type) =>
    provideTracedClass(type, 'infrastructure.http-agent.catalog'),
  );
}

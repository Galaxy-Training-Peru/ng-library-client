import { Provider, Type } from '@angular/core';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';
import { LiteraryGenresHttpClient, PublishersHttpClient } from '../rest-clients';

const HTTP_CLIENT_TYPES: Array<Type<object>> = [
  LiteraryGenresHttpClient,
  PublishersHttpClient,
];

export function provideHttpClients(): Provider[] {
  return HTTP_CLIENT_TYPES.flatMap((type) =>
    provideTracedClass(type, 'infrastructure.http-client.catalog'),
  );
}

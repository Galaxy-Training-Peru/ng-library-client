import { Provider, Type } from '@angular/core';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';
import {
  AuthorsHttpClient,
  PapersHttpClient,
  AwardsHttpClient,
  AffiliationsHttpClient,
} from '../rest-clients';

const HTTP_CLIENT_TYPES: Array<Type<object>> = [
  AuthorsHttpClient,
  PapersHttpClient,
  AwardsHttpClient,
  AffiliationsHttpClient,
];

export function provideHttpClients(): Provider[] {
  return HTTP_CLIENT_TYPES.flatMap((type) =>
    provideTracedClass(type, 'infrastructure.http-client.authors'),
  );
}

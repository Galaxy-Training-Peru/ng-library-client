import { Provider } from '@angular/core';
import { AUTHORS_PUBLIC_API } from '../../application/public-api';
import { AuthorsPublicApiImpl } from '../../application/public-api/authors.public-api-impl';

export function providePublicApi(): Provider[] {
  return [
    { provide: AUTHORS_PUBLIC_API, useClass: AuthorsPublicApiImpl },
  ];
}

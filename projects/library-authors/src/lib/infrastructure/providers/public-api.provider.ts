import { Provider } from '@angular/core';
import { AUTHORS_PUBLIC_API } from '../../application/public-api';
import { AUTHORS_COMPUTATIONS_API } from '../../application/computations-api';
import { AUTHORS_VALIDATIONS_API } from '../../application/validations-api';
import { AuthorsPublicApiImpl } from '../../application/public-api/authors.public-api-impl';
import { AuthorsComputationsApiImpl } from '../../application/computations-api/authors.computations-api-impl';
import { AuthorsValidationsApiImpl } from '../../application/validations-api/authors.validations-api-impl';

export function providePublicApi(): Provider[] {
  return [
    { provide: AUTHORS_PUBLIC_API,       useClass: AuthorsPublicApiImpl },
    { provide: AUTHORS_COMPUTATIONS_API, useClass: AuthorsComputationsApiImpl },
    { provide: AUTHORS_VALIDATIONS_API,  useClass: AuthorsValidationsApiImpl },
  ];
}

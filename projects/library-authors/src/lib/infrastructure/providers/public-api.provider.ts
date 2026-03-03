import { Provider } from '@angular/core';
import { AUTHORS_PUBLIC_API } from '../../application/public-api';
import { AUTHORS_COMPUTATIONS_API } from '../../application/computations-api';
import { AUTHORS_VALIDATIONS_API } from '../../application/validations-api';
import { AuthorsPublicApiImpl } from '../../application/public-api/authors.public-api-impl';
import { AuthorsComputationsApiImpl } from '../../application/computations-api/authors.computations-api-impl';
import { AuthorsValidationsApiImpl } from '../../application/validations-api/authors.validations-api-impl';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function providePublicApi(): Provider[] {
  const implementations = [
    AuthorsPublicApiImpl,
    AuthorsComputationsApiImpl,
    AuthorsValidationsApiImpl,
  ];

  return [
    ...implementations.flatMap((implementation) =>
      provideTracedClass(implementation, 'application.public-api-impl.authors'),
    ),
    {
      provide: AUTHORS_PUBLIC_API,
      useExisting: AuthorsPublicApiImpl,
    },
    {
      provide: AUTHORS_COMPUTATIONS_API,
      useExisting: AuthorsComputationsApiImpl,
    },
    {
      provide: AUTHORS_VALIDATIONS_API,
      useExisting: AuthorsValidationsApiImpl,
    },
  ];
}

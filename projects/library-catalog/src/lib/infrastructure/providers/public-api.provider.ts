import { Provider } from '@angular/core';
import { CATALOG_PUBLIC_API } from '../../application/public-api';
import { CatalogPublicApiImpl } from '../../application/public-api/catalog.public-api-impl';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function providePublicApi(): Provider[] {
  return [
    ...provideTracedClass(CatalogPublicApiImpl, 'application.public-api-impl.catalog'),
    {
      provide: CATALOG_PUBLIC_API,
      useExisting: CatalogPublicApiImpl,
    },
  ];
}

import { Provider } from '@angular/core';
import { CATALOG_PUBLIC_API } from '../../application/public-api';
import { CatalogPublicApiImpl } from '../../application/public-api/catalog.public-api-impl';

export function providePublicApi(): Provider[] {
  return [
    { provide: CATALOG_PUBLIC_API, useClass: CatalogPublicApiImpl },
  ];
}

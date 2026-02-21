import { InjectionToken } from '@angular/core';
import type { LiteraryGenrePublicApi } from './literary-genre.public-api';
import type { PublisherPublicApi } from './publisher.public-api';

/**
 * Combined Catalog module Public API (Facade).
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CatalogPublicApi extends LiteraryGenrePublicApi, PublisherPublicApi {}

export const CATALOG_PUBLIC_API = new InjectionToken<CatalogPublicApi>('CatalogPublicApi');

/*
 * Public API Surface of library-catalog
 */

export { provideCatalogModule, provideLiteraryGenreAgent, providePublisherAgent } from './lib/infrastructure/providers';

export { CATALOG_PUBLIC_API } from './lib/application/public-api';
export type { CatalogPublicApi } from './lib/application/public-api';
export type {
  GetAllLiteraryGenresRequest,
  GetAllLiteraryGenresResponse,
  GetLiteraryGenreByIdRequest,
  GetLiteraryGenreByIdResponse,
  ExistsLiteraryGenreRequest,
  ExistsLiteraryGenreResponse,
  CheckLiteraryGenreNameUniquenessRequest,
  CheckLiteraryGenreNameUniquenessResponse,
  GetAllPublishersRequest,
  GetAllPublishersResponse,
  GetPublisherByIdRequest,
  GetPublisherByIdResponse,
  ExistsPublisherRequest,
  ExistsPublisherResponse,
  CheckPublisherNameUniquenessRequest,
  CheckPublisherNameUniquenessResponse,
} from './lib/application/public-api';

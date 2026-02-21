/*
 * Public API Surface of library-authors
 */

export { AUTHORS_ROUTES } from './lib/presentation/routes/author.routes';
export { provideAuthorsModule, provideAuthorAgent } from './lib/infrastructure/providers';

// Public API Facade
export type { AuthorsPublicApi } from './lib/application/public-api';
export type { AuthorPublicApi } from './lib/application/public-api';
export type { PaperPublicApi } from './lib/application/public-api';
export type { AwardPublicApi } from './lib/application/public-api';
export type { AffiliationPublicApi } from './lib/application/public-api';
export { AUTHORS_PUBLIC_API } from './lib/application/public-api';

// Public API Contracts - Author
export type {
  GetAllAuthorsRequest,
  GetAuthorByIdRequest,
  ExistsAuthorRequest,
  CheckAuthorNameUniquenessRequest,
  GetAllAuthorsResponse,
  GetAuthorByIdResponse,
  ExistsAuthorResponse,
  CheckAuthorNameUniquenessResponse,
} from './lib/application/public-api';

// Public API Contracts - Paper
export type {
  GetAllPapersOfAuthorRequest,
  GetPaperOfAuthorByPaperIdRequest,
  ExistsPaperOfAuthorRequest,
  CheckPaperTitleUniquenessOfAuthorRequest,
  GetAllPapersOfAuthorResponse,
  GetPaperOfAuthorByPaperIdResponse,
  ExistsPaperOfAuthorResponse,
  CheckPaperTitleUniquenessOfAuthorResponse,
} from './lib/application/public-api';

// Public API Contracts - Award
export type {
  GetAllAwardsOfAuthorRequest,
  GetAwardOfAuthorByAwardIdRequest,
  ExistsAwardOfAuthorRequest,
  CheckAwardTitleUniquenessOfAuthorRequest,
  GetAllAwardsOfAuthorResponse,
  GetAwardOfAuthorByAwardIdResponse,
  ExistsAwardOfAuthorResponse,
  CheckAwardTitleUniquenessOfAuthorResponse,
} from './lib/application/public-api';

// Public API Contracts - Affiliation
export type {
  GetAllAffiliationsOfAuthorRequest,
  GetAffiliationOfAuthorByAffiliationIdRequest,
  ExistsAffiliationOfAuthorRequest,
  CheckAffiliationNameUniquenessOfAuthorRequest,
  GetAllAffiliationsOfAuthorResponse,
  GetAffiliationOfAuthorByAffiliationIdResponse,
  ExistsAffiliationOfAuthorResponse,
  CheckAffiliationNameUniquenessOfAuthorResponse,
} from './lib/application/public-api';

/*
 * Public API Surface of library-integration
 */

// Catalog - LiteraryGenre
export type { LiteraryGenreAgent } from './lib/catalog/literary-genre';
export { LITERARY_GENRE_AGENT } from './lib/catalog/literary-genre';
export type {
  LiteraryGenreDto,
  GetAllLiteraryGenresRequest,
  GetAllLiteraryGenresResponse,
  GetLiteraryGenreByIdRequest,
  GetLiteraryGenreByIdResponse,
  ExistsLiteraryGenreRequest,
  ExistsLiteraryGenreResponse,
  CheckLiteraryGenreNameUniquenessRequest,
  CheckLiteraryGenreNameUniquenessResponse,
} from './lib/catalog/literary-genre';


// Catalog - Publisher
export type { PublisherAgent } from './lib/catalog/publisher';
export { PUBLISHER_AGENT } from './lib/catalog/publisher';
export type {
  PublisherDto,
  GetAllPublishersRequest,
  GetAllPublishersResponse,
  GetPublisherByIdRequest,
  GetPublisherByIdResponse,
  ExistsPublisherRequest,
  ExistsPublisherResponse,
  CheckPublisherNameUniquenessRequest,
  CheckPublisherNameUniquenessResponse,
} from './lib/catalog/publisher';


// Authors - Author
export type { AuthorAgent } from './lib/authors/author';
export { AUTHOR_AGENT } from './lib/authors/author';
export type {
  AuthorDto,
  GetAllAuthorsRequest,
  GetAllAuthorsResponse,
  GetAuthorByIdRequest,
  GetAuthorByIdResponse,
  ExistsAuthorRequest,
  ExistsAuthorResponse,
  CheckAuthorNameUniquenessRequest,
  CheckAuthorNameUniquenessResponse,
} from './lib/authors/author';


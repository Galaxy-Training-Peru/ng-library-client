import type {
  GetAllAuthorsRequest,
  GetAllAuthorsResponse,
  GetAuthorByIdRequest,
  GetAuthorByIdResponse,
  ExistsAuthorRequest,
  ExistsAuthorResponse,
  CheckAuthorNameUniquenessRequest,
  CheckAuthorNameUniquenessResponse,
} from './author';

export interface AuthorPublicApi {
  getAllAuthors(request: GetAllAuthorsRequest): Promise<GetAllAuthorsResponse>;
  getAuthorById(request: GetAuthorByIdRequest): Promise<GetAuthorByIdResponse>;
  existsAuthor(request: ExistsAuthorRequest): Promise<ExistsAuthorResponse>;
  checkAuthorNameUniqueness(request: CheckAuthorNameUniquenessRequest): Promise<CheckAuthorNameUniquenessResponse>;
}

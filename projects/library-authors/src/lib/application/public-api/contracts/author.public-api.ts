import type {
  GetAllAuthorsRequest,
  GetAllAuthorsResponse,
  GetAuthorByIdRequest,
  GetAuthorByIdResponse,
  ExistsAuthorRequest,
  ExistsAuthorResponse,
  CheckAuthorNameUniquenessRequest,
  CheckAuthorNameUniquenessResponse,
  CreateAuthorRequest,
  CreateAuthorResponse,
  UpsertAuthorRequest,
  UpsertAuthorResponse,
  DeleteAuthorRequest,
  DeleteAuthorResponse,
  UpdatePartialAuthorRequest,
  UpdatePartialAuthorResponse,
} from './author';

export interface AuthorPublicApi {
  getAllAuthors(request: GetAllAuthorsRequest): Promise<GetAllAuthorsResponse>;
  getAuthorById(request: GetAuthorByIdRequest): Promise<GetAuthorByIdResponse>;
  existsAuthor(request: ExistsAuthorRequest): Promise<ExistsAuthorResponse>;
  checkAuthorNameUniqueness(request: CheckAuthorNameUniquenessRequest): Promise<CheckAuthorNameUniquenessResponse>;
  createAuthor(request: CreateAuthorRequest): Promise<CreateAuthorResponse>;
  upsertAuthor(request: UpsertAuthorRequest): Promise<UpsertAuthorResponse>;
  deleteAuthor(request: DeleteAuthorRequest): Promise<DeleteAuthorResponse>;
  updatePartialAuthor(request: UpdatePartialAuthorRequest): Promise<UpdatePartialAuthorResponse>;
}

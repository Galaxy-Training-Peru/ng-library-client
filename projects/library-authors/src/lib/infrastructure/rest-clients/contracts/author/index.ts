export type { AuthorDto } from '../../dtos';
export type {
  GetAllAuthorsHttpRequest,
  GetAllAuthorsHttpResponse,
  GetAuthorByIdHttpRequest,
  GetAuthorByIdHttpResponse,
  ExistsAuthorHttpRequest,
  ExistsAuthorHttpResponse,
  ExistsAuthorHttpData,
  CheckAuthorNameUniquenessHttpRequest,
  CheckAuthorNameUniquenessHttpResponse,
  CheckAuthorNameUniquenessHttpData,
} from './queries';
export type {
  CreateAuthorHttpRequest,
  CreateAuthorHttpResponse,
  UpsertAuthorHttpRequest,
  UpsertAuthorHttpResponse,
  UpdatePartialAuthorHttpRequest,
  DeleteAuthorHttpRequest,
} from './commands';

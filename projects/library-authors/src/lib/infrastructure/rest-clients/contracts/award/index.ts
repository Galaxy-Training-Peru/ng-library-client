export type { AwardDto } from '../../dtos';
export type {
  GetAllAwardsOfAuthorHttpRequest,
  GetAllAwardsOfAuthorHttpResponse,
  GetAwardOfAuthorByAwardIdHttpRequest,
  GetAwardOfAuthorByAwardIdHttpResponse,
  ExistsAwardOfAuthorHttpRequest,
  ExistsAwardOfAuthorHttpResponse,
  ExistsAwardOfAuthorHttpData,
  CheckAwardTitleUniquenessOfAuthorHttpRequest,
  CheckAwardTitleUniquenessOfAuthorHttpResponse,
  CheckAwardTitleUniquenessOfAuthorHttpData,
} from './queries';
export type {
  AddAwardToAuthorHttpRequest,
  AddAwardToAuthorHttpResponse,
  UpsertAwardOfAuthorHttpRequest,
  UpsertAwardOfAuthorHttpResponse,
  UpdatePartialAwardOfAuthorHttpRequest,
  RemoveAwardFromAuthorHttpRequest,
} from './commands';

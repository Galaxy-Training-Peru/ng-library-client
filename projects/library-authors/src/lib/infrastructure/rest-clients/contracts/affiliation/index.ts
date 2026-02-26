export type { AffiliationDto } from '../../dtos';
export type {
  GetAllAffiliationsOfAuthorHttpRequest,
  GetAllAffiliationsOfAuthorHttpResponse,
  GetAffiliationOfAuthorByAffiliationIdHttpRequest,
  GetAffiliationOfAuthorByAffiliationIdHttpResponse,
  ExistsAffiliationOfAuthorHttpRequest,
  ExistsAffiliationOfAuthorHttpResponse,
  ExistsAffiliationOfAuthorHttpData,
  CheckAffiliationNameUniquenessOfAuthorHttpRequest,
  CheckAffiliationNameUniquenessOfAuthorHttpResponse,
  CheckAffiliationNameUniquenessOfAuthorHttpData,
} from './queries';
export type {
  AddAffiliationToAuthorHttpRequest,
  AddAffiliationToAuthorHttpResponse,
  UpsertAffiliationOfAuthorHttpRequest,
  UpsertAffiliationOfAuthorHttpResponse,
  UpdatePartialAffiliationOfAuthorHttpRequest,
  RemoveAffiliationFromAuthorHttpRequest,
} from './commands';

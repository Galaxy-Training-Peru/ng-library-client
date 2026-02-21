import type {
  GetAllAffiliationsOfAuthorRequest,
  GetAllAffiliationsOfAuthorResponse,
  GetAffiliationOfAuthorByAffiliationIdRequest,
  GetAffiliationOfAuthorByAffiliationIdResponse,
  ExistsAffiliationOfAuthorRequest,
  ExistsAffiliationOfAuthorResponse,
  CheckAffiliationNameUniquenessOfAuthorRequest,
  CheckAffiliationNameUniquenessOfAuthorResponse,
} from './affiliation';

export interface AffiliationPublicApi {
  getAllAffiliationsOfAuthor(request: GetAllAffiliationsOfAuthorRequest): Promise<GetAllAffiliationsOfAuthorResponse>;
  getAffiliationOfAuthorByAffiliationId(request: GetAffiliationOfAuthorByAffiliationIdRequest): Promise<GetAffiliationOfAuthorByAffiliationIdResponse>;
  existsAffiliationOfAuthor(request: ExistsAffiliationOfAuthorRequest): Promise<ExistsAffiliationOfAuthorResponse>;
  checkAffiliationNameUniquenessOfAuthor(request: CheckAffiliationNameUniquenessOfAuthorRequest): Promise<CheckAffiliationNameUniquenessOfAuthorResponse>;
}

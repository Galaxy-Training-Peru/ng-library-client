import type {
  GetAllAwardsOfAuthorRequest,
  GetAllAwardsOfAuthorResponse,
  GetAwardOfAuthorByAwardIdRequest,
  GetAwardOfAuthorByAwardIdResponse,
  ExistsAwardOfAuthorRequest,
  ExistsAwardOfAuthorResponse,
  CheckAwardTitleUniquenessOfAuthorRequest,
  CheckAwardTitleUniquenessOfAuthorResponse,
} from './award';

export interface AwardPublicApi {
  getAllAwardsOfAuthor(request: GetAllAwardsOfAuthorRequest): Promise<GetAllAwardsOfAuthorResponse>;
  getAwardOfAuthorByAwardId(request: GetAwardOfAuthorByAwardIdRequest): Promise<GetAwardOfAuthorByAwardIdResponse>;
  existsAwardOfAuthor(request: ExistsAwardOfAuthorRequest): Promise<ExistsAwardOfAuthorResponse>;
  checkAwardTitleUniquenessOfAuthor(request: CheckAwardTitleUniquenessOfAuthorRequest): Promise<CheckAwardTitleUniquenessOfAuthorResponse>;
}

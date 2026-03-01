import type {
  BuildFullNameRequest,
  BuildFullNameResponse,
  CalculateAgeRequest,
  CalculateAgeResponse,
  IsDeceasedRequest,
  IsDeceasedResponse,
} from './author';

export interface AuthorComputationsApi {
  buildFullName(request: BuildFullNameRequest): Promise<BuildFullNameResponse>;
  calculateAge(request: CalculateAgeRequest): Promise<CalculateAgeResponse>;
  isDeceased(request: IsDeceasedRequest): Promise<IsDeceasedResponse>;
}

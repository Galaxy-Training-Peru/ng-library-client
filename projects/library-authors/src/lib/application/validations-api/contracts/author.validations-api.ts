import type {
  ValidateFullNameRequest,
  ValidateFullNameResponse,
  ValidateLifeSpanRequest,
  ValidateLifeSpanResponse,
} from './author';

export interface AuthorValidationsApi {
  validateFullName(request: ValidateFullNameRequest): ValidateFullNameResponse;
  validateLifeSpan(request: ValidateLifeSpanRequest): ValidateLifeSpanResponse;
}

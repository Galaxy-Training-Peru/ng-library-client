import type { AffiliationDto } from '../../../../dtos/affiliation.dto';

export interface AddAffiliationToAuthorHttpRequest {
  readonly authorId: string;
  readonly affiliationId?: string;
  readonly institutionName: string;
  readonly startDate: string;
  readonly endDate?: string;
}

// Server returns 201 with { data: AffiliationDto }. Client unwraps and returns the DTO directly.
export type AddAffiliationToAuthorHttpResponse = AffiliationDto;

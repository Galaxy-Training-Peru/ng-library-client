import type { AwardDto } from '../../../../dtos/award.dto';

export interface AddAwardToAuthorHttpRequest {
  readonly authorId: string;
  readonly title: string;
  readonly awardedOn: string;
}

// Server returns 201 with { data: AwardDto }. Client unwraps and returns the DTO directly.
export type AddAwardToAuthorHttpResponse = AwardDto;

import type { AwardDto } from '../../../../dtos/award.dto';

export interface GetAwardOfAuthorByAwardIdHttpResponse {
  readonly data: AwardDto;
}

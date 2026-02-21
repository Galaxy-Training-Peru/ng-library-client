import type { PaperDto } from '../../../../dtos/paper.dto';

export interface GetPaperOfAuthorByPaperIdHttpResponse {
  readonly data: PaperDto;
}

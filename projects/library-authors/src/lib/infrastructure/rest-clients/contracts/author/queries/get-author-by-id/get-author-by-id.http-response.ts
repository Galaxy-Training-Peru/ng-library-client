import type { AuthorDto } from '../../../../dtos/author.dto';

export interface GetAuthorByIdHttpResponse {
  readonly data: AuthorDto;
}

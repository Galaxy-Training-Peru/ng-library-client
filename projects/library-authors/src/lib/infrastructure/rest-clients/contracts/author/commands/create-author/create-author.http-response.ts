import type { AuthorDto } from '../../../../dtos/author.dto';

// Server returns 201 with { data: AuthorDto }. Client unwraps and returns the DTO directly.
export type CreateAuthorHttpResponse = AuthorDto;

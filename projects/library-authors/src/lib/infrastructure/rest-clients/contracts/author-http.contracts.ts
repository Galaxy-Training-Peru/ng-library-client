import type { AuthorDto } from '../dtos/author.dto';
import type { PaginationMeta } from '../dtos/pagination-meta';

// -- GetAllAuthors --

export interface GetAllAuthorsHttpRequest {
  readonly pageNumber?: number;
  readonly pageSize?: number;
  readonly sort?: string;
  readonly search?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly literaryGenreId?: string;
}

export interface GetAllAuthorsHttpResponse {
  readonly data: AuthorDto[];
  readonly pagination: PaginationMeta;
}

// -- GetAuthorById --

export interface GetAuthorByIdHttpRequest {
  readonly authorId: string;
  readonly fields?: string;
}

export interface GetAuthorByIdHttpResponse {
  readonly data: AuthorDto;
}

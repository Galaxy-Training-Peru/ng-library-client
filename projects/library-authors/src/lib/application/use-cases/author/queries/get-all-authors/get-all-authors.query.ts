import type { Query, SortField } from '@eac-arch/shared-kernel';

export interface GetAllAuthorsQuery extends Query {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly literaryGenreId?: string;
  readonly search?: string;
  readonly sortFields?: SortField[];
  readonly fields?: string[];
}

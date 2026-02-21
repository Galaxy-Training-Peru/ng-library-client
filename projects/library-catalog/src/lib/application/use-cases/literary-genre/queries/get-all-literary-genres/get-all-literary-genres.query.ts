import type { Query, SortField } from '@eac-arch/shared-kernel';

export interface GetAllLiteraryGenresQuery extends Query {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly search?: string;
  readonly sortFields?: SortField[];
  readonly fields?: string[];
}

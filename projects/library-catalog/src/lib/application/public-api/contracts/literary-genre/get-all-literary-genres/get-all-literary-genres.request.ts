import type { SortField } from '@eac-arch/shared-kernel';

export interface GetAllLiteraryGenresRequest {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly search?: string;
  readonly sortFields?: SortField[];
  readonly fields?: string[];
}

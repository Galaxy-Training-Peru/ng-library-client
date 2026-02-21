import type { Query, SortField } from '@eac-arch/shared-kernel';

export interface GetAllAffiliationsOfAuthorQuery extends Query {
  readonly authorId: string;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly institutionName?: string;
  readonly activeOn?: string;
  readonly search?: string;
  readonly sortFields?: SortField[];
  readonly fields?: string[];
}

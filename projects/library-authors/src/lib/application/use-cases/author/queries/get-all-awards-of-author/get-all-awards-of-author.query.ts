import type { Query, SortField } from '@eac-arch/shared-kernel';

export interface GetAllAwardsOfAuthorQuery extends Query {
  readonly authorId: string;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly title?: string;
  readonly awardedYear?: number;
  readonly search?: string;
  readonly sortFields?: SortField[];
  readonly fields?: string[];
}

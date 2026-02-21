import type { Query } from '@eac-arch/shared-kernel';

export interface CheckAffiliationNameUniquenessOfAuthorQuery extends Query {
  readonly authorId: string;
  readonly institutionName: string;
  readonly excludeAffiliationId?: string;
}

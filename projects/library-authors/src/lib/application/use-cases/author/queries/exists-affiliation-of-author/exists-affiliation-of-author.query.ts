import type { Query } from '@eac-arch/shared-kernel';

export interface ExistsAffiliationOfAuthorQuery extends Query {
  readonly authorId: string;
  readonly affiliationId: string;
}

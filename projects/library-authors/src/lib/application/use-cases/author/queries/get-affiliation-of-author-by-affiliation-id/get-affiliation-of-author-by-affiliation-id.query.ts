import type { Query } from '@eac-arch/shared-kernel';

export interface GetAffiliationOfAuthorByAffiliationIdQuery extends Query {
  readonly authorId: string;
  readonly affiliationId: string;
  readonly fields?: string[];
}

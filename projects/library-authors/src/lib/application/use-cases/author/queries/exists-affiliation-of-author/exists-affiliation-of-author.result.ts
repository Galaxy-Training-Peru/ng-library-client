import type { QueryResult } from '@eac-arch/shared-kernel';

export interface ExistsAffiliationOfAuthorResult extends QueryResult {
  readonly authorId: string;
  readonly affiliationId: string;
  readonly exists: boolean;
}

import type { QueryResult } from '@eac-arch/shared-kernel';

export interface CheckAffiliationNameUniquenessOfAuthorResult extends QueryResult {
  readonly institutionName: string;
  readonly isUnique: boolean;
}

import type { QueryResult } from '@eac-arch/shared-kernel';

export interface CheckAwardTitleUniquenessOfAuthorResult extends QueryResult {
  readonly title: string;
  readonly isUnique: boolean;
}

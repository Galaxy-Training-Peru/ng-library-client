import type { QueryResult } from '@eac-arch/shared-kernel';

export interface CheckPaperTitleUniquenessOfAuthorResult extends QueryResult {
  readonly title: string;
  readonly isUnique: boolean;
}

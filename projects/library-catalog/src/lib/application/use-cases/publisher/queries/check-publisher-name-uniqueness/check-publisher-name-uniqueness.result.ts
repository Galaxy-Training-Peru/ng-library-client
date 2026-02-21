import type { QueryResult } from '@eac-arch/shared-kernel';

export interface CheckPublisherNameUniquenessResult extends QueryResult {
  readonly name: string;
  readonly isUnique: boolean;
}

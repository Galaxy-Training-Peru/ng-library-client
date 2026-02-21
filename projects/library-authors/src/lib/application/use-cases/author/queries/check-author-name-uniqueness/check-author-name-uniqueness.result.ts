import type { QueryResult } from '@eac-arch/shared-kernel';

export interface CheckAuthorNameUniquenessResult extends QueryResult {
  readonly firstName: string;
  readonly lastName: string;
  readonly isUnique: boolean;
}

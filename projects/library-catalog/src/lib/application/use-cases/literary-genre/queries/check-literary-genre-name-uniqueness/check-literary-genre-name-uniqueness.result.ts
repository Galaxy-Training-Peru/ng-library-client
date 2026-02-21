import type { QueryResult } from '@eac-arch/shared-kernel';

export interface CheckLiteraryGenreNameUniquenessResult extends QueryResult {
  readonly name: string;
  readonly isUnique: boolean;
}

import type { QueryResult } from '@eac-arch/shared-kernel';

export interface ExistsAwardOfAuthorResult extends QueryResult {
  readonly authorId: string;
  readonly awardId: string;
  readonly exists: boolean;
}

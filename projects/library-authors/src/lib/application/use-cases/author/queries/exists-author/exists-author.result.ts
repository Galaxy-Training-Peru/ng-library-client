import type { QueryResult } from '@eac-arch/shared-kernel';

export interface ExistsAuthorResult extends QueryResult {
  readonly authorId: string;
  readonly exists: boolean;
}

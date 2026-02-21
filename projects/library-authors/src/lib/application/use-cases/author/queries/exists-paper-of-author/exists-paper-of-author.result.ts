import type { QueryResult } from '@eac-arch/shared-kernel';

export interface ExistsPaperOfAuthorResult extends QueryResult {
  readonly authorId: string;
  readonly paperId: string;
  readonly exists: boolean;
}

import type { Query } from '@eac-arch/shared-kernel';

export interface ExistsPaperOfAuthorQuery extends Query {
  readonly authorId: string;
  readonly paperId: string;
}

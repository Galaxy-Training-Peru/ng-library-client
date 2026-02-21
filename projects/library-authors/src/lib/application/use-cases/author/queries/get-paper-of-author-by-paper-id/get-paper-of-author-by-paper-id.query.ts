import type { Query } from '@eac-arch/shared-kernel';

export interface GetPaperOfAuthorByPaperIdQuery extends Query {
  readonly authorId: string;
  readonly paperId: string;
  readonly fields?: string[];
}

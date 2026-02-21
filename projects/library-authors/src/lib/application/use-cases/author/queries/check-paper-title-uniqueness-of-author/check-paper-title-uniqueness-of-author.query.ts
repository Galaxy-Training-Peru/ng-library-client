import type { Query } from '@eac-arch/shared-kernel';

export interface CheckPaperTitleUniquenessOfAuthorQuery extends Query {
  readonly authorId: string;
  readonly title: string;
  readonly excludePaperId?: string;
}

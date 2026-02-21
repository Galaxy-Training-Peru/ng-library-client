import type { Query } from '@eac-arch/shared-kernel';

export interface CheckAwardTitleUniquenessOfAuthorQuery extends Query {
  readonly authorId: string;
  readonly title: string;
  readonly excludeAwardId?: string;
}

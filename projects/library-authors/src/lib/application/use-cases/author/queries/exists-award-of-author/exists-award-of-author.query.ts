import type { Query } from '@eac-arch/shared-kernel';

export interface ExistsAwardOfAuthorQuery extends Query {
  readonly authorId: string;
  readonly awardId: string;
}

import type { Query } from '@eac-arch/shared-kernel';

export interface ExistsAuthorQuery extends Query {
  readonly authorId: string;
}

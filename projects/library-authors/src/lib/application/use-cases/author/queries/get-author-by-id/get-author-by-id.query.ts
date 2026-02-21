import type { Query } from '@eac-arch/shared-kernel';

export interface GetAuthorByIdQuery extends Query {
  readonly authorId: string;
  readonly fields?: string[];
}

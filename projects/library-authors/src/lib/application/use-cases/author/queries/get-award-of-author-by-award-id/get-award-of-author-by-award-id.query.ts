import type { Query } from '@eac-arch/shared-kernel';

export interface GetAwardOfAuthorByAwardIdQuery extends Query {
  readonly authorId: string;
  readonly awardId: string;
  readonly fields?: string[];
}

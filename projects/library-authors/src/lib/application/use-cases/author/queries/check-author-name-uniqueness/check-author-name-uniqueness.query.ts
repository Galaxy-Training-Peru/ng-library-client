import type { Query } from '@eac-arch/shared-kernel';

export interface CheckAuthorNameUniquenessQuery extends Query {
  readonly firstName: string;
  readonly lastName: string;
  readonly excludeAuthorId?: string;
}

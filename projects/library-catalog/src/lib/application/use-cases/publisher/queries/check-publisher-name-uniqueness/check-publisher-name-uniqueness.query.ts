import type { Query } from '@eac-arch/shared-kernel';

export interface CheckPublisherNameUniquenessQuery extends Query {
  readonly name: string;
  readonly excludePublisherId?: string;
}

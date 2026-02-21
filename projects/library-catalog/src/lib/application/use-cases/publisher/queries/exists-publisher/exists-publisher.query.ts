import type { Query } from '@eac-arch/shared-kernel';

export interface ExistsPublisherQuery extends Query {
  readonly publisherId: string;
}

import type { Query } from '@eac-arch/shared-kernel';

export interface GetPublisherByIdQuery extends Query {
  readonly publisherId: string;
  readonly fields?: string[];
}

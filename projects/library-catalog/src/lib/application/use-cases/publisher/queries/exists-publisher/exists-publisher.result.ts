import type { QueryResult } from '@eac-arch/shared-kernel';

export interface ExistsPublisherResult extends QueryResult {
  readonly publisherId: string;
  readonly exists: boolean;
}

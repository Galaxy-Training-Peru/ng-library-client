import type { QueryResult } from '@eac-arch/shared-kernel';

export interface ExistsLiteraryGenreResult extends QueryResult {
  readonly literaryGenreId: string;
  readonly exists: boolean;
}

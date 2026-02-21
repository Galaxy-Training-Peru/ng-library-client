import type { Query } from '@eac-arch/shared-kernel';

export interface ExistsLiteraryGenreQuery extends Query {
  readonly literaryGenreId: string;
}

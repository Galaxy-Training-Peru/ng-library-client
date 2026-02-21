import type { Query } from '@eac-arch/shared-kernel';

export interface CheckLiteraryGenreNameUniquenessQuery extends Query {
  readonly name: string;
  readonly excludeLiteraryGenreId?: string;
}

import type { Query } from '@eac-arch/shared-kernel';

export interface GetLiteraryGenreByIdQuery extends Query {
  readonly literaryGenreId: string;
  readonly fields?: string[];
}

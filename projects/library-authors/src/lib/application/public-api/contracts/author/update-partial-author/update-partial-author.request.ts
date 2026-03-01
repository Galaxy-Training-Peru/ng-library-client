import type { AuthorChanges } from '../../../../contracts';

export interface UpdatePartialAuthorRequest {
  readonly authorId: string;
  readonly changes: AuthorChanges;
}

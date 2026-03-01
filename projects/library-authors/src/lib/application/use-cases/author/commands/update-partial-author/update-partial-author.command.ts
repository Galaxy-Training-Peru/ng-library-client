import type { Command } from '@eac-arch/shared-kernel';
import type { AuthorChanges } from '../../../../contracts';

export interface UpdatePartialAuthorCommand extends Command {
  readonly authorId: string;
  readonly changes: AuthorChanges;
}

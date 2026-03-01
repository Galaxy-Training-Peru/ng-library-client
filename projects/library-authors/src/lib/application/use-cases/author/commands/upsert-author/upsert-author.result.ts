import type { CommandResult } from '@eac-arch/shared-kernel';
import type { AuthorModel } from '../../../../models';

export interface UpsertAuthorResult extends CommandResult {
  readonly isCreated: boolean;
  readonly author: AuthorModel | null;
}


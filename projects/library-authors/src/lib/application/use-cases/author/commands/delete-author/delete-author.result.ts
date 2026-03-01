import type { CommandResult } from '@eac-arch/shared-kernel';

export interface DeleteAuthorResult extends CommandResult {
  readonly success: boolean;
}

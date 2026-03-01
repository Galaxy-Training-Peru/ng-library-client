import type { CommandResult } from '@eac-arch/shared-kernel';

export interface UpdatePartialAuthorResult extends CommandResult {
  readonly success: boolean;
}

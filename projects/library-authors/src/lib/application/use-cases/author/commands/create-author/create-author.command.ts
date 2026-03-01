import type { Command } from '@eac-arch/shared-kernel';

export interface CreateAuthorCommand extends Command {
  readonly authorId?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string;
  readonly dateOfDeath?: string | null;
  readonly literaryGenreId: string;
}

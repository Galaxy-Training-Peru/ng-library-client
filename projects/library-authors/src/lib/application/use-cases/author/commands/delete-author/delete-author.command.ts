import type { Command } from '@eac-arch/shared-kernel';

export interface DeleteAuthorCommand extends Command {
  readonly authorId: string;
}

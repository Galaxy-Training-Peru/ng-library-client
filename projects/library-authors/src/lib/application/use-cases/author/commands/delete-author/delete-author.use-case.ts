import { inject, Injectable } from '@angular/core';
import type { CommandUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_REPOSITORY } from '../../../../contracts';
import type { DeleteAuthorCommand } from './delete-author.command';
import type { DeleteAuthorResult } from './delete-author.result';

@Injectable()
export class DeleteAuthorUseCase implements CommandUseCase<DeleteAuthorCommand, DeleteAuthorResult> {

  private readonly repository = inject(AUTHOR_REPOSITORY);

  async execute(command: DeleteAuthorCommand): Promise<DeleteAuthorResult> {
    await this.repository.delete(command.authorId);
    return { success: true };
  }
}


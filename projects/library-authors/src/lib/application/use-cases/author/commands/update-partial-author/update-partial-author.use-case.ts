import { inject, Injectable } from '@angular/core';
import type { CommandUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_REPOSITORY } from '../../../../contracts';
import type { UpdatePartialAuthorCommand } from './update-partial-author.command';
import type { UpdatePartialAuthorResult } from './update-partial-author.result';

@Injectable()
export class UpdatePartialAuthorUseCase implements CommandUseCase<UpdatePartialAuthorCommand, UpdatePartialAuthorResult> {

  private readonly repository = inject(AUTHOR_REPOSITORY);

  async execute(command: UpdatePartialAuthorCommand): Promise<UpdatePartialAuthorResult> {
    await this.repository.updatePartial(command.authorId, command.changes);
    return { success: true };
  }
}

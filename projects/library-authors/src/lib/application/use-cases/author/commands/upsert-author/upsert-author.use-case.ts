import { inject, Injectable } from '@angular/core';
import type { CommandUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_REPOSITORY } from '../../../../contracts';
import { AuthorModelMapper } from '../../../../mappings/author-model.mapper';
import { Author } from '../../../../../domain/aggregates/author';
import { FullName } from '../../../../../domain/value-objects/full-name';
import { LifeSpan } from '../../../../../domain/value-objects/life-span';
import { LiteraryGenre } from '../../../../../domain/value-objects/literary-genre';
import { LITERARY_GENRE_AGENT } from 'library-integration';
import type { UpsertAuthorCommand } from './upsert-author.command';
import type { UpsertAuthorResult } from './upsert-author.result';

@Injectable()
export class UpsertAuthorUseCase implements CommandUseCase<UpsertAuthorCommand, UpsertAuthorResult> {

  private readonly repository         = inject(AUTHOR_REPOSITORY);
  private readonly literaryGenreAgent = inject(LITERARY_GENRE_AGENT);

  async execute(command: UpsertAuthorCommand): Promise<UpsertAuthorResult> {
    const genre = await this.literaryGenreAgent.getLiteraryGenreById({ literaryGenreId: command.literaryGenreId });

    const fullName      = FullName.create(command.firstName, command.lastName);
    const lifeSpan      = LifeSpan.create(new Date(command.dateOfBirth), command.dateOfDeath ? new Date(command.dateOfDeath) : null);
    const literaryGenre = LiteraryGenre.create(genre.literaryGenreId, genre.name);

    const existing = await this.repository.getById(command.authorId);

    if (existing) {
      existing.updateProfile(fullName, lifeSpan, literaryGenre);
      await this.repository.upsert(existing.authorId, existing);
      return { isCreated: false, author: null };
    }

    const author = Author.create(command.authorId, fullName, lifeSpan, literaryGenre);
    const created = await this.repository.upsert(author.authorId, author);
    return { isCreated: true, author: AuthorModelMapper.toModel(created!) };
  }
}


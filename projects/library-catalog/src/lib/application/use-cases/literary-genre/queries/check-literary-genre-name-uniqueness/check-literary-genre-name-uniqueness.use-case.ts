import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { LITERARY_GENRE_QUERY_SERVICE, type LiteraryGenreQueryService } from '../../../../contracts/persistence/queries';
import type { CheckLiteraryGenreNameUniquenessQuery } from './check-literary-genre-name-uniqueness.query';
import type { CheckLiteraryGenreNameUniquenessResult } from './check-literary-genre-name-uniqueness.result';

@Injectable()
export class CheckLiteraryGenreNameUniquenessUseCase implements QueryUseCase<CheckLiteraryGenreNameUniquenessQuery, CheckLiteraryGenreNameUniquenessResult> {

  private readonly literaryGenreQueryService = inject(LITERARY_GENRE_QUERY_SERVICE);

  async execute(query: CheckLiteraryGenreNameUniquenessQuery): Promise<CheckLiteraryGenreNameUniquenessResult> {
    const isUnique = await this.literaryGenreQueryService.checkLiteraryGenreNameUniqueness(
      query.name,
      query.excludeLiteraryGenreId,
    );

    return {
      name: query.name,
      isUnique,
    };
  }
}

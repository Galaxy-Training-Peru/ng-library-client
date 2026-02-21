import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { LITERARY_GENRE_QUERY_SERVICE, type LiteraryGenreQueryService } from '../../../../contracts/persistence/queries';
import type { ExistsLiteraryGenreQuery } from './exists-literary-genre.query';
import type { ExistsLiteraryGenreResult } from './exists-literary-genre.result';

@Injectable()
export class ExistsLiteraryGenreUseCase implements QueryUseCase<ExistsLiteraryGenreQuery, ExistsLiteraryGenreResult> {

  private readonly literaryGenreQueryService = inject(LITERARY_GENRE_QUERY_SERVICE);

  async execute(query: ExistsLiteraryGenreQuery): Promise<ExistsLiteraryGenreResult> {
    const exists = await this.literaryGenreQueryService.existsLiteraryGenre(query.literaryGenreId);

    return {
      literaryGenreId: query.literaryGenreId,
      exists,
    };
  }
}

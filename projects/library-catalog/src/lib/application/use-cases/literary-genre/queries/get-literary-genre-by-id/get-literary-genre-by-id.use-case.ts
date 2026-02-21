import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { LITERARY_GENRE_QUERY_SERVICE, type LiteraryGenreQueryService } from '../../../../contracts/persistence/queries';
import type { GetLiteraryGenreByIdQuery } from './get-literary-genre-by-id.query';
import type { GetLiteraryGenreByIdResult } from './get-literary-genre-by-id.result';

@Injectable()
export class GetLiteraryGenreByIdUseCase implements QueryUseCase<GetLiteraryGenreByIdQuery, GetLiteraryGenreByIdResult> {

  private readonly literaryGenreQueryService = inject(LITERARY_GENRE_QUERY_SERVICE);

  async execute(query: GetLiteraryGenreByIdQuery): Promise<GetLiteraryGenreByIdResult> {
    const literaryGenre = await this.literaryGenreQueryService.getLiteraryGenreById(query.literaryGenreId, query.fields);

    if (!literaryGenre) {
      throw new Error(`Literary genre with id '${query.literaryGenreId}' was not found`);
    }

    return literaryGenre;
  }
}

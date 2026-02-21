import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { QuerySpecificationBuilder } from '@eac-arch/shared-kernel';
import { LITERARY_GENRE_QUERY_SERVICE, type LiteraryGenreQueryService } from '../../../../contracts/persistence/queries';
import type { LiteraryGenreModel } from '../../../../models';
import { LiteraryGenreSearchSpec } from '../../../../../domain/specifications';
import type { GetAllLiteraryGenresQuery } from './get-all-literary-genres.query';
import type { GetAllLiteraryGenresResult } from './get-all-literary-genres.result';

@Injectable()
export class GetAllLiteraryGenresUseCase implements QueryUseCase<GetAllLiteraryGenresQuery, GetAllLiteraryGenresResult> {

  private readonly literaryGenreQueryService = inject(LITERARY_GENRE_QUERY_SERVICE);

  async execute(query: GetAllLiteraryGenresQuery): Promise<GetAllLiteraryGenresResult> {
    const builder = new QuerySpecificationBuilder<LiteraryGenreModel>();

    builder
      .and(new LiteraryGenreSearchSpec(query.search));

    const spec = builder.build();

    return this.literaryGenreQueryService.getAllLiteraryGenres(
      query.pageNumber,
      query.pageSize,
      spec,
      query.sortFields,
      query.fields,
    );
  }
}

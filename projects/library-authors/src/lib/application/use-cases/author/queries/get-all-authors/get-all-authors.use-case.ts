import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { QuerySpecificationBuilder } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE, type AuthorQueryService } from '../../../../contracts/persistence/queries';
import type { AuthorModel } from '../../../../models';
import { AuthorByNameSpec, AuthorByLiteraryGenreIdSpec, AuthorSearchSpec } from '../../../../../domain/specifications';
import type { GetAllAuthorsQuery } from './get-all-authors.query';
import type { GetAllAuthorsResult } from './get-all-authors.result';

@Injectable()
export class GetAllAuthorsUseCase implements QueryUseCase<GetAllAuthorsQuery, GetAllAuthorsResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);

  async execute(query: GetAllAuthorsQuery): Promise<GetAllAuthorsResult> {
    const builder = new QuerySpecificationBuilder<AuthorModel>();

    builder
      .and(new AuthorByNameSpec(query.firstName, query.lastName))
      .and(new AuthorByLiteraryGenreIdSpec(query.literaryGenreId))
      .and(new AuthorSearchSpec(query.search));

    const spec = builder.build();

    return this.authorQueryService.getAllAuthors(
      query.pageNumber,
      query.pageSize,
      spec,
      query.sortFields,
      query.fields,
    );
  }
}

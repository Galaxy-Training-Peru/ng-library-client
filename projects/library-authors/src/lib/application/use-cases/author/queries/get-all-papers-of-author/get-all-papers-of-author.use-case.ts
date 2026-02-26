import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { QuerySpecificationBuilder } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE } from '../../../../contracts/queries';
import { PAPER_QUERY_SERVICE } from '../../../../contracts/queries';
import type { PaperModel } from '../../../../models';
import { PaperByTitleSpec, PaperByYearSpec, PaperSearchSpec } from '../../../../../domain/specifications';
import type { GetAllPapersOfAuthorQuery } from './get-all-papers-of-author.query';
import type { GetAllPapersOfAuthorResult } from './get-all-papers-of-author.result';

@Injectable()
export class GetAllPapersOfAuthorUseCase implements QueryUseCase<GetAllPapersOfAuthorQuery, GetAllPapersOfAuthorResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);
  private readonly paperQueryService = inject(PAPER_QUERY_SERVICE);

  async execute(query: GetAllPapersOfAuthorQuery): Promise<GetAllPapersOfAuthorResult> {
    const exists = await this.authorQueryService.existsAuthor(query.authorId);
    if (!exists) {
      throw new Error(`Author with id '${query.authorId}' was not found`);
    }

    const builder = new QuerySpecificationBuilder<PaperModel>();

    builder
      .and(new PaperByTitleSpec(query.title))
      .and(new PaperByYearSpec(query.publishedYear))
      .and(new PaperSearchSpec(query.search));

    const spec = builder.build();

    return this.paperQueryService.getAllPapersOfAuthor(
      query.authorId,
      query.pageNumber,
      query.pageSize,
      spec,
      query.sortFields,
      query.fields,
    );
  }
}

import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE } from '../../../../contracts/queries';
import { PAPER_QUERY_SERVICE } from '../../../../contracts/queries';
import type { GetPaperOfAuthorByPaperIdQuery } from './get-paper-of-author-by-paper-id.query';
import type { GetPaperOfAuthorByPaperIdResult } from './get-paper-of-author-by-paper-id.result';

@Injectable()
export class GetPaperOfAuthorByPaperIdUseCase implements QueryUseCase<GetPaperOfAuthorByPaperIdQuery, GetPaperOfAuthorByPaperIdResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);
  private readonly paperQueryService = inject(PAPER_QUERY_SERVICE);

  async execute(query: GetPaperOfAuthorByPaperIdQuery): Promise<GetPaperOfAuthorByPaperIdResult> {
    const authorExists = await this.authorQueryService.existsAuthor(query.authorId);
    if (!authorExists) {
      throw new Error(`Author with id '${query.authorId}' was not found`);
    }

    const paper = await this.paperQueryService.getPaperOfAuthorByPaperId(
      query.authorId,
      query.paperId,
      query.fields,
    );

    if (!paper) {
      throw new Error(`Paper with id '${query.paperId}' was not found`);
    }

    return paper;
  }
}

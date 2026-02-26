import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { PAPER_QUERY_SERVICE, type PaperQueryService } from '../../../../contracts/queries';
import type { ExistsPaperOfAuthorQuery } from './exists-paper-of-author.query';
import type { ExistsPaperOfAuthorResult } from './exists-paper-of-author.result';

@Injectable()
export class ExistsPaperOfAuthorUseCase implements QueryUseCase<ExistsPaperOfAuthorQuery, ExistsPaperOfAuthorResult> {

  private readonly paperQueryService = inject(PAPER_QUERY_SERVICE);

  async execute(query: ExistsPaperOfAuthorQuery): Promise<ExistsPaperOfAuthorResult> {
    const exists = await this.paperQueryService.existsPaperOfAuthor(query.authorId, query.paperId);

    return {
      authorId: query.authorId,
      paperId: query.paperId,
      exists,
    };
  }
}

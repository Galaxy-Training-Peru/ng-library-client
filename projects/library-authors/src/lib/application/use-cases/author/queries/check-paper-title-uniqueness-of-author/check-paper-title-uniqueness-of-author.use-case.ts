import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { PAPER_QUERY_SERVICE } from '../../../../contracts/persistence/queries';
import type { CheckPaperTitleUniquenessOfAuthorQuery } from './check-paper-title-uniqueness-of-author.query';
import type { CheckPaperTitleUniquenessOfAuthorResult } from './check-paper-title-uniqueness-of-author.result';

@Injectable()
export class CheckPaperTitleUniquenessOfAuthorUseCase implements QueryUseCase<CheckPaperTitleUniquenessOfAuthorQuery, CheckPaperTitleUniquenessOfAuthorResult> {

  private readonly paperQueryService = inject(PAPER_QUERY_SERVICE);

  async execute(query: CheckPaperTitleUniquenessOfAuthorQuery): Promise<CheckPaperTitleUniquenessOfAuthorResult> {
    const isUnique = await this.paperQueryService.checkPaperTitleUniquenessOfAuthor(
      query.authorId,
      query.title,
      query.excludePaperId,
    );

    return {
      title: query.title,
      isUnique,
    };
  }
}

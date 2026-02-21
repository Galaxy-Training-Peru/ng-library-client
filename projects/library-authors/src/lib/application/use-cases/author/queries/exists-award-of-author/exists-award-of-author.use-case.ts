import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AWARD_QUERY_SERVICE, type AwardQueryService } from '../../../../contracts/persistence/queries';
import type { ExistsAwardOfAuthorQuery } from './exists-award-of-author.query';
import type { ExistsAwardOfAuthorResult } from './exists-award-of-author.result';

@Injectable()
export class ExistsAwardOfAuthorUseCase implements QueryUseCase<ExistsAwardOfAuthorQuery, ExistsAwardOfAuthorResult> {

  private readonly awardQueryService = inject(AWARD_QUERY_SERVICE);

  async execute(query: ExistsAwardOfAuthorQuery): Promise<ExistsAwardOfAuthorResult> {
    const exists = await this.awardQueryService.existsAwardOfAuthor(query.authorId, query.awardId);

    return {
      authorId: query.authorId,
      awardId: query.awardId,
      exists,
    };
  }
}

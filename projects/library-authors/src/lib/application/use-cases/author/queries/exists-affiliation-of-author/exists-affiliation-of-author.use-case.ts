import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AFFILIATION_QUERY_SERVICE, type AffiliationQueryService } from '../../../../contracts/queries';
import type { ExistsAffiliationOfAuthorQuery } from './exists-affiliation-of-author.query';
import type { ExistsAffiliationOfAuthorResult } from './exists-affiliation-of-author.result';

@Injectable()
export class ExistsAffiliationOfAuthorUseCase implements QueryUseCase<ExistsAffiliationOfAuthorQuery, ExistsAffiliationOfAuthorResult> {

  private readonly affiliationQueryService = inject(AFFILIATION_QUERY_SERVICE);

  async execute(query: ExistsAffiliationOfAuthorQuery): Promise<ExistsAffiliationOfAuthorResult> {
    const exists = await this.affiliationQueryService.existsAffiliationOfAuthor(query.authorId, query.affiliationId);

    return {
      authorId: query.authorId,
      affiliationId: query.affiliationId,
      exists,
    };
  }
}

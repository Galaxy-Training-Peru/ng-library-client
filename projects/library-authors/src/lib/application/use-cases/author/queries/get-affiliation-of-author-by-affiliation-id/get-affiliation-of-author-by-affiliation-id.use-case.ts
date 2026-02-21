import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE } from '../../../../contracts/persistence/queries';
import { AFFILIATION_QUERY_SERVICE } from '../../../../contracts/persistence/queries';
import type { GetAffiliationOfAuthorByAffiliationIdQuery } from './get-affiliation-of-author-by-affiliation-id.query';
import type { GetAffiliationOfAuthorByAffiliationIdResult } from './get-affiliation-of-author-by-affiliation-id.result';

@Injectable()
export class GetAffiliationOfAuthorByAffiliationIdUseCase implements QueryUseCase<GetAffiliationOfAuthorByAffiliationIdQuery, GetAffiliationOfAuthorByAffiliationIdResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);
  private readonly affiliationQueryService = inject(AFFILIATION_QUERY_SERVICE);

  async execute(query: GetAffiliationOfAuthorByAffiliationIdQuery): Promise<GetAffiliationOfAuthorByAffiliationIdResult> {
    const authorExists = await this.authorQueryService.existsAuthor(query.authorId);
    if (!authorExists) {
      throw new Error(`Author with id '${query.authorId}' was not found`);
    }

    const affiliation = await this.affiliationQueryService.getAffiliationOfAuthorByAffiliationId(
      query.authorId,
      query.affiliationId,
      query.fields,
    );

    if (!affiliation) {
      throw new Error(`Affiliation with id '${query.affiliationId}' was not found`);
    }

    return affiliation;
  }
}

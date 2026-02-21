import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE } from '../../../../contracts/persistence/queries';
import { AWARD_QUERY_SERVICE } from '../../../../contracts/persistence/queries';
import type { GetAwardOfAuthorByAwardIdQuery } from './get-award-of-author-by-award-id.query';
import type { GetAwardOfAuthorByAwardIdResult } from './get-award-of-author-by-award-id.result';

@Injectable()
export class GetAwardOfAuthorByAwardIdUseCase implements QueryUseCase<GetAwardOfAuthorByAwardIdQuery, GetAwardOfAuthorByAwardIdResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);
  private readonly awardQueryService = inject(AWARD_QUERY_SERVICE);

  async execute(query: GetAwardOfAuthorByAwardIdQuery): Promise<GetAwardOfAuthorByAwardIdResult> {
    const authorExists = await this.authorQueryService.existsAuthor(query.authorId);
    if (!authorExists) {
      throw new Error(`Author with id '${query.authorId}' was not found`);
    }

    const award = await this.awardQueryService.getAwardOfAuthorByAwardId(
      query.authorId,
      query.awardId,
      query.fields,
    );

    if (!award) {
      throw new Error(`Award with id '${query.awardId}' was not found`);
    }

    return award;
  }
}

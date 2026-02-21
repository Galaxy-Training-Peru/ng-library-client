import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE, type AuthorQueryService } from '../../../../contracts/persistence/queries';
import type { CheckAuthorNameUniquenessQuery } from './check-author-name-uniqueness.query';
import type { CheckAuthorNameUniquenessResult } from './check-author-name-uniqueness.result';

@Injectable()
export class CheckAuthorNameUniquenessUseCase implements QueryUseCase<CheckAuthorNameUniquenessQuery, CheckAuthorNameUniquenessResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);

  async execute(query: CheckAuthorNameUniquenessQuery): Promise<CheckAuthorNameUniquenessResult> {
    const isUnique = await this.authorQueryService.checkAuthorNameUniqueness(
      query.firstName,
      query.lastName,
      query.excludeAuthorId,
    );

    return {
      firstName: query.firstName,
      lastName: query.lastName,
      isUnique,
    };
  }
}

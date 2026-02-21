import { inject, Injectable } from '@angular/core';
import { defer, type Observable } from 'rxjs';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE, type AuthorQueryService } from '../../../contracts/persistence/queries';
import type { CheckAuthorNameUniquenessQuery } from './check-author-name-uniqueness.query';
import type { CheckAuthorNameUniquenessResult } from './check-author-name-uniqueness.result';

@Injectable({ providedIn: 'root' })
export class CheckAuthorNameUniquenessUseCase implements QueryUseCase<CheckAuthorNameUniquenessQuery, CheckAuthorNameUniquenessResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);

  execute(query: CheckAuthorNameUniquenessQuery): Observable<CheckAuthorNameUniquenessResult> {
    return defer(async () => {
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
    });
  }
}

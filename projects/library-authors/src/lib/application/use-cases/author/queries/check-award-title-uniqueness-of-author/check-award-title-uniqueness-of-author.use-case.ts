import { inject, Injectable } from '@angular/core';
import { defer, type Observable } from 'rxjs';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AWARD_QUERY_SERVICE } from '../../../contracts/persistence/queries';
import type { CheckAwardTitleUniquenessOfAuthorQuery } from './check-award-title-uniqueness-of-author.query';
import type { CheckAwardTitleUniquenessOfAuthorResult } from './check-award-title-uniqueness-of-author.result';

@Injectable({ providedIn: 'root' })
export class CheckAwardTitleUniquenessOfAuthorUseCase implements QueryUseCase<CheckAwardTitleUniquenessOfAuthorQuery, CheckAwardTitleUniquenessOfAuthorResult> {

  private readonly awardQueryService = inject(AWARD_QUERY_SERVICE);

  execute(query: CheckAwardTitleUniquenessOfAuthorQuery): Observable<CheckAwardTitleUniquenessOfAuthorResult> {
    return defer(async () => {
      const isUnique = await this.awardQueryService.checkAwardTitleUniquenessOfAuthor(
        query.authorId,
        query.title,
        query.excludeAwardId,
      );

      return {
        title: query.title,
        isUnique,
      };
    });
  }
}

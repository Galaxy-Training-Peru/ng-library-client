import { inject, Injectable } from '@angular/core';
import { defer, type Observable } from 'rxjs';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AFFILIATION_QUERY_SERVICE } from '../../../contracts/persistence/queries';
import type { CheckAffiliationNameUniquenessOfAuthorQuery } from './check-affiliation-name-uniqueness-of-author.query';
import type { CheckAffiliationNameUniquenessOfAuthorResult } from './check-affiliation-name-uniqueness-of-author.result';

@Injectable({ providedIn: 'root' })
export class CheckAffiliationNameUniquenessOfAuthorUseCase implements QueryUseCase<CheckAffiliationNameUniquenessOfAuthorQuery, CheckAffiliationNameUniquenessOfAuthorResult> {

  private readonly affiliationQueryService = inject(AFFILIATION_QUERY_SERVICE);

  execute(query: CheckAffiliationNameUniquenessOfAuthorQuery): Observable<CheckAffiliationNameUniquenessOfAuthorResult> {
    return defer(async () => {
      const isUnique = await this.affiliationQueryService.checkAffiliationNameUniquenessOfAuthor(
        query.authorId,
        query.institutionName,
        query.excludeAffiliationId,
      );

      return {
        institutionName: query.institutionName,
        isUnique,
      };
    });
  }
}

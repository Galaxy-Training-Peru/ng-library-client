import { inject, Injectable } from '@angular/core';
import { defer, type Observable } from 'rxjs';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { QuerySpecificationBuilder } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE } from '../../../contracts/persistence/queries';
import { AFFILIATION_QUERY_SERVICE } from '../../../contracts/persistence/queries';
import type { AffiliationModel } from '../../../models';
import { AffiliationByNameSpec, AffiliationByActivePeriodSpec, AffiliationSearchSpec } from '../../../../domain/specifications';
import type { GetAllAffiliationsOfAuthorQuery } from './get-all-affiliations-of-author.query';
import type { GetAllAffiliationsOfAuthorResult } from './get-all-affiliations-of-author.result';

@Injectable({ providedIn: 'root' })
export class GetAllAffiliationsOfAuthorUseCase implements QueryUseCase<GetAllAffiliationsOfAuthorQuery, GetAllAffiliationsOfAuthorResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);
  private readonly affiliationQueryService = inject(AFFILIATION_QUERY_SERVICE);

  execute(query: GetAllAffiliationsOfAuthorQuery): Observable<GetAllAffiliationsOfAuthorResult> {
    return defer(async () => {
      const exists = await this.authorQueryService.existsAuthor(query.authorId);
      if (!exists) {
        throw new Error(`Author with id '${query.authorId}' was not found`);
      }

      const builder = new QuerySpecificationBuilder<AffiliationModel>();

      builder
        .and(new AffiliationByNameSpec(query.institutionName))
        .and(new AffiliationByActivePeriodSpec(query.activeOn))
        .and(new AffiliationSearchSpec(query.search));

      const spec = builder.build();

      return this.affiliationQueryService.getAllAffiliationsOfAuthor(
        query.authorId,
        query.pageNumber,
        query.pageSize,
        spec,
        query.sortFields,
        query.fields,
      );
    });
  }
}

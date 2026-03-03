import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { QuerySpecificationBuilder } from '@eac-arch/shared-kernel';
import { AFFILIATION_QUERY_SERVICE } from '../../../../contracts/queries';
import type { AffiliationModel } from '../../../../models';
import { AffiliationByNameSpec, AffiliationByActivePeriodSpec, AffiliationSearchSpec } from '../../../../../domain/specifications';
import type { GetAllAffiliationsOfAuthorQuery } from './get-all-affiliations-of-author.query';
import type { GetAllAffiliationsOfAuthorResult } from './get-all-affiliations-of-author.result';

@Injectable()
export class GetAllAffiliationsOfAuthorUseCase implements QueryUseCase<GetAllAffiliationsOfAuthorQuery, GetAllAffiliationsOfAuthorResult> {

  private readonly affiliationQueryService = inject(AFFILIATION_QUERY_SERVICE);

  async execute(query: GetAllAffiliationsOfAuthorQuery): Promise<GetAllAffiliationsOfAuthorResult> {
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
  }
}

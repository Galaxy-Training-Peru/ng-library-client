import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { QuerySpecificationBuilder } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE } from '../../../../contracts/persistence/queries';
import { AWARD_QUERY_SERVICE } from '../../../../contracts/persistence/queries';
import type { AwardModel } from '../../../../models';
import { AwardByTitleSpec, AwardByYearSpec, AwardSearchSpec } from '../../../../../domain/specifications';
import type { GetAllAwardsOfAuthorQuery } from './get-all-awards-of-author.query';
import type { GetAllAwardsOfAuthorResult } from './get-all-awards-of-author.result';

@Injectable()
export class GetAllAwardsOfAuthorUseCase implements QueryUseCase<GetAllAwardsOfAuthorQuery, GetAllAwardsOfAuthorResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);
  private readonly awardQueryService = inject(AWARD_QUERY_SERVICE);

  async execute(query: GetAllAwardsOfAuthorQuery): Promise<GetAllAwardsOfAuthorResult> {
    const exists = await this.authorQueryService.existsAuthor(query.authorId);
    if (!exists) {
      throw new Error(`Author with id '${query.authorId}' was not found`);
    }

    const builder = new QuerySpecificationBuilder<AwardModel>();

    builder
      .and(new AwardByTitleSpec(query.title))
      .and(new AwardByYearSpec(query.awardedYear))
      .and(new AwardSearchSpec(query.search));

    const spec = builder.build();

    return this.awardQueryService.getAllAwardsOfAuthor(
      query.authorId,
      query.pageNumber,
      query.pageSize,
      spec,
      query.sortFields,
      query.fields,
    );
  }
}

import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { QuerySpecificationBuilder } from '@eac-arch/shared-kernel';
import { PUBLISHER_QUERY_SERVICE, type PublisherQueryService } from '../../../../contracts/persistence/queries';
import type { PublisherModel } from '../../../../models';
import { PublisherSearchSpec } from '../../../../../domain/specifications';
import type { GetAllPublishersQuery } from './get-all-publishers.query';
import type { GetAllPublishersResult } from './get-all-publishers.result';

@Injectable()
export class GetAllPublishersUseCase implements QueryUseCase<GetAllPublishersQuery, GetAllPublishersResult> {

  private readonly publisherQueryService = inject(PUBLISHER_QUERY_SERVICE);

  async execute(query: GetAllPublishersQuery): Promise<GetAllPublishersResult> {
    const builder = new QuerySpecificationBuilder<PublisherModel>();

    builder
      .and(new PublisherSearchSpec(query.search));

    const spec = builder.build();

    return this.publisherQueryService.getAllPublishers(
      query.pageNumber,
      query.pageSize,
      spec,
      query.sortFields,
      query.fields,
    );
  }
}

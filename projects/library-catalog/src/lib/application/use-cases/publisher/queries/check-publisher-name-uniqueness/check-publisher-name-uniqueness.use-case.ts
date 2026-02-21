import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { PUBLISHER_QUERY_SERVICE, type PublisherQueryService } from '../../../../contracts/persistence/queries';
import type { CheckPublisherNameUniquenessQuery } from './check-publisher-name-uniqueness.query';
import type { CheckPublisherNameUniquenessResult } from './check-publisher-name-uniqueness.result';

@Injectable()
export class CheckPublisherNameUniquenessUseCase implements QueryUseCase<CheckPublisherNameUniquenessQuery, CheckPublisherNameUniquenessResult> {

  private readonly publisherQueryService = inject(PUBLISHER_QUERY_SERVICE);

  async execute(query: CheckPublisherNameUniquenessQuery): Promise<CheckPublisherNameUniquenessResult> {
    const isUnique = await this.publisherQueryService.checkPublisherNameUniqueness(
      query.name,
      query.excludePublisherId,
    );

    return {
      name: query.name,
      isUnique,
    };
  }
}

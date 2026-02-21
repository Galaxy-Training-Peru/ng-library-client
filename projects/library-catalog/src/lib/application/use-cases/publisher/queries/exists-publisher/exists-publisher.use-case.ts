import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { PUBLISHER_QUERY_SERVICE, type PublisherQueryService } from '../../../../contracts/persistence/queries';
import type { ExistsPublisherQuery } from './exists-publisher.query';
import type { ExistsPublisherResult } from './exists-publisher.result';

@Injectable()
export class ExistsPublisherUseCase implements QueryUseCase<ExistsPublisherQuery, ExistsPublisherResult> {

  private readonly publisherQueryService = inject(PUBLISHER_QUERY_SERVICE);

  async execute(query: ExistsPublisherQuery): Promise<ExistsPublisherResult> {
    const exists = await this.publisherQueryService.existsPublisher(query.publisherId);

    return {
      publisherId: query.publisherId,
      exists,
    };
  }
}

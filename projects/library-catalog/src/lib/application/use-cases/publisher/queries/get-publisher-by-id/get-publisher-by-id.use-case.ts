import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { PUBLISHER_QUERY_SERVICE, type PublisherQueryService } from '../../../../contracts/persistence/queries';
import type { GetPublisherByIdQuery } from './get-publisher-by-id.query';
import type { GetPublisherByIdResult } from './get-publisher-by-id.result';

@Injectable()
export class GetPublisherByIdUseCase implements QueryUseCase<GetPublisherByIdQuery, GetPublisherByIdResult> {

  private readonly publisherQueryService = inject(PUBLISHER_QUERY_SERVICE);

  async execute(query: GetPublisherByIdQuery): Promise<GetPublisherByIdResult> {
    const publisher = await this.publisherQueryService.getPublisherById(query.publisherId, query.fields);

    if (!publisher) {
      throw new Error(`Publisher with id '${query.publisherId}' was not found`);
    }

    return publisher;
  }
}

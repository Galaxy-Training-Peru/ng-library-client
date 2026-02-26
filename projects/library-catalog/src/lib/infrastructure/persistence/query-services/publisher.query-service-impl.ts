import { inject, Injectable } from '@angular/core';
import { type PagedList, type Specification, type SortField } from '@eac-arch/shared-kernel';
import { HttpQueryService } from '@eac-arch/infrastructure-persistence';
import type { PublisherQueryService } from '../../../application/contracts';
import type { PublisherModel } from '../../../application/models';
import { PublishersHttpAgent } from '../../http-agents';
import type { PublisherQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class PublisherQueryServiceImpl
  extends HttpQueryService<PublisherModel, PublisherQueryOptions>
  implements PublisherQueryService {

  private readonly httpAgent = inject(PublishersHttpAgent);

  // -- HttpQueryService delegates --

  protected override doGetAll(pageNumber: number, pageSize: number, options?: PublisherQueryOptions): Promise<PagedList<PublisherModel>> {
    return this.httpAgent.getAllPublishers(pageNumber, pageSize, options);
  }

  protected override doGetById(id: string): Promise<PublisherModel | null> {
    return this.httpAgent.getPublisherById(id);
  }

  // -- PublisherQueryService-specific methods --

  getAllPublishers(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<PublisherModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<PublisherModel>> {
    return this.getPagedList(pageNumber, pageSize, spec, sortFields, fields);
  }

  getPublisherById(publisherId: string, fields?: string[]): Promise<PublisherModel | null> {
    return this.httpAgent.getPublisherById(publisherId, fields?.join(','));
  }

  existsPublisher(publisherId: string): Promise<boolean> {
    return this.httpAgent.existsPublisher(publisherId);
  }

  checkPublisherNameUniqueness(name: string, excludePublisherId?: string): Promise<boolean> {
    return this.httpAgent.checkPublisherNameUniqueness(name, excludePublisherId);
  }
}

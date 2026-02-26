import { InjectionToken } from '@angular/core';
import type { PagedList, IQueryService, Specification, SortField } from '@eac-arch/shared-kernel';
import type { PublisherModel } from '../../../models';

export interface PublisherQueryService extends IQueryService<PublisherModel> {
  getAllPublishers(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<PublisherModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<PublisherModel>>;

  getPublisherById(publisherId: string, fields?: string[]): Promise<PublisherModel | null>;

  existsPublisher(publisherId: string): Promise<boolean>;

  checkPublisherNameUniqueness(name: string, excludePublisherId?: string): Promise<boolean>;
}

export const PUBLISHER_QUERY_SERVICE = new InjectionToken<PublisherQueryService>('PublisherQueryService');

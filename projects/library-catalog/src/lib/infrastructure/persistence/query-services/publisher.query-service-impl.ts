import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
  createPagedList,
  formatSortFields,
  QuerySpecification,
} from '@eac-arch/shared-kernel';
import type { PublisherQueryService } from '../../../application/contracts';
import type { PublisherModel } from '../../../application/models';
import { PublishersHttpAgent } from '../../http-agents';
import type { PublisherQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class PublisherQueryServiceImpl implements PublisherQueryService {
  private readonly agent = inject(PublishersHttpAgent);

  async getAll(): Promise<PublisherModel[]> {
    const result = await this.agent.getAllPublishers(1, Number.MAX_SAFE_INTEGER);
    return [...result.items];
  }

  getById(id: string): Promise<PublisherModel | null> {
    return this.agent.getPublisherById(id);
  }

  async getPagedList(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<PublisherModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<PublisherModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllPublishers(pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  async getAllPublishers(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<PublisherModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<PublisherModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllPublishers(pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getPublisherById(publisherId: string, fields?: string[]): Promise<PublisherModel | null> {
    return this.agent.getPublisherById(publisherId, fields?.join(','));
  }

  existsPublisher(publisherId: string): Promise<boolean> {
    return this.agent.existsPublisher(publisherId);
  }

  checkPublisherNameUniqueness(name: string, excludePublisherId?: string): Promise<boolean> {
    return this.agent.checkPublisherNameUniqueness(name, excludePublisherId);
  }

  private buildOptions(
    spec?: Specification<PublisherModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): PublisherQueryOptions {
    const options: PublisherQueryOptions = {};
    if (spec instanceof QuerySpecification) {
      Object.assign(options, spec.toQueryParams());
    }
    if (sortFields?.length) options.sort = formatSortFields(sortFields);
    if (fields?.length) options.fields = fields.join(',');
    return options;
  }

  private toPagedList(source: { items: readonly PublisherModel[]; totalCount: number; currentPage: number; pageSize: number }): PagedList<PublisherModel> {
    return createPagedList([...source.items], source.totalCount, source.currentPage, source.pageSize);
  }
}

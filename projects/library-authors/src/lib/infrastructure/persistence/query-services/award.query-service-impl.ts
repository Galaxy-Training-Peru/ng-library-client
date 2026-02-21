import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
  QuerySpecification,
  createPagedList,
  formatSortFields,
} from '@eac-arch/shared-kernel';
import type { AwardQueryService } from '../../../application/contracts';
import type { AwardModel } from '../../../application/models';
import { AwardsHttpAgent } from '../../http-agents';
import type { AwardQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class AwardQueryServiceImpl implements AwardQueryService {
  private readonly agent = inject(AwardsHttpAgent);

  async getAllAwardsOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AwardModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AwardModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllAwardsOfAuthor(authorId, pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getAwardOfAuthorByAwardId(authorId: string, awardId: string, fields?: string[]): Promise<AwardModel | null> {
    return this.agent.getAwardOfAuthorByAwardId(authorId, awardId, fields?.join(','));
  }

  existsAwardOfAuthor(authorId: string, awardId: string): Promise<boolean> {
    return this.agent.existsAwardOfAuthor(authorId, awardId);
  }

  checkAwardTitleUniquenessOfAuthor(authorId: string, title: string, excludeAwardId?: string): Promise<boolean> {
    return this.agent.checkAwardTitleUniquenessOfAuthor(authorId, title, excludeAwardId);
  }

  private buildOptions(
    spec?: Specification<AwardModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): AwardQueryOptions {
    const options: AwardQueryOptions = {};

    if (spec instanceof QuerySpecification) {
      Object.assign(options, spec.toQueryParams());
    }
    if (sortFields?.length) options.sort = formatSortFields(sortFields);
    if (fields?.length) options.fields = fields.join(',');

    return options;
  }

  private toPagedList(source: { items: readonly AwardModel[]; totalCount: number; currentPage: number; pageSize: number }): PagedList<AwardModel> {
    return createPagedList([...source.items], source.totalCount, source.currentPage, source.pageSize);
  }
}

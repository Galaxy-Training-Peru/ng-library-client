import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
  QuerySpecification,
  createPagedList,
  formatSortFields,
} from '@eac-arch/shared-kernel';
import type { AffiliationQueryService } from '../../../application/contracts';
import type { AffiliationModel } from '../../../application/models';
import { AffiliationsHttpAgent } from '../../http-agents';
import type { AffiliationQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class AffiliationQueryServiceImpl implements AffiliationQueryService {
  private readonly agent = inject(AffiliationsHttpAgent);

  async getAllAffiliationsOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AffiliationModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AffiliationModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllAffiliationsOfAuthor(authorId, pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getAffiliationOfAuthorByAffiliationId(authorId: string, affiliationId: string, fields?: string[]): Promise<AffiliationModel | null> {
    return this.agent.getAffiliationOfAuthorByAffiliationId(authorId, affiliationId, fields?.join(','));
  }

  existsAffiliationOfAuthor(authorId: string, affiliationId: string): Promise<boolean> {
    return this.agent.existsAffiliationOfAuthor(authorId, affiliationId);
  }

  checkAffiliationNameUniquenessOfAuthor(authorId: string, institutionName: string, excludeAffiliationId?: string): Promise<boolean> {
    return this.agent.checkAffiliationNameUniquenessOfAuthor(authorId, institutionName, excludeAffiliationId);
  }

  private buildOptions(
    spec?: Specification<AffiliationModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): AffiliationQueryOptions {
    const options: AffiliationQueryOptions = {};

    if (spec instanceof QuerySpecification) {
      Object.assign(options, spec.toQueryParams());
    }
    if (sortFields?.length) options.sort = formatSortFields(sortFields);
    if (fields?.length) options.fields = fields.join(',');

    return options;
  }

  private toPagedList(source: { items: readonly AffiliationModel[]; totalCount: number; currentPage: number; pageSize: number }): PagedList<AffiliationModel> {
    return createPagedList([...source.items], source.totalCount, source.currentPage, source.pageSize);
  }
}

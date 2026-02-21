import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
  QuerySpecification,
  createPagedList,
  formatSortFields,
} from '@eac-arch/shared-kernel';
import type { PaperQueryService } from '../../../application/contracts';
import type { PaperModel } from '../../../application/models';
import { PapersHttpAgent } from '../../http-agents';
import type { PaperQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class PaperQueryServiceImpl implements PaperQueryService {
  private readonly agent = inject(PapersHttpAgent);

  async getAllPapersOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<PaperModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<PaperModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllPapersOfAuthor(authorId, pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getPaperOfAuthorByPaperId(authorId: string, paperId: string, fields?: string[]): Promise<PaperModel | null> {
    return this.agent.getPaperOfAuthorByPaperId(authorId, paperId, fields?.join(','));
  }

  existsPaperOfAuthor(authorId: string, paperId: string): Promise<boolean> {
    return this.agent.existsPaperOfAuthor(authorId, paperId);
  }

  checkPaperTitleUniquenessOfAuthor(authorId: string, title: string, excludePaperId?: string): Promise<boolean> {
    return this.agent.checkPaperTitleUniquenessOfAuthor(authorId, title, excludePaperId);
  }

  private buildOptions(
    spec?: Specification<PaperModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): PaperQueryOptions {
    const options: PaperQueryOptions = {};

    if (spec instanceof QuerySpecification) {
      Object.assign(options, spec.toQueryParams());
    }
    if (sortFields?.length) options.sort = formatSortFields(sortFields);
    if (fields?.length) options.fields = fields.join(',');

    return options;
  }

  private toPagedList(source: { items: readonly PaperModel[]; totalCount: number; currentPage: number; pageSize: number }): PagedList<PaperModel> {
    return createPagedList([...source.items], source.totalCount, source.currentPage, source.pageSize);
  }
}

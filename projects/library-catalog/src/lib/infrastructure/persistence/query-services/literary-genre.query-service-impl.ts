import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
  createPagedList,
  formatSortFields,
  QuerySpecification,
} from '@eac-arch/shared-kernel';
import type { LiteraryGenreQueryService } from '../../../application/contracts';
import type { LiteraryGenreModel } from '../../../application/models';
import { LiteraryGenresHttpAgent } from '../../http-agents';
import type { LiteraryGenreQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class LiteraryGenreQueryServiceImpl implements LiteraryGenreQueryService {
  private readonly agent = inject(LiteraryGenresHttpAgent);

  async getAll(): Promise<LiteraryGenreModel[]> {
    const result = await this.agent.getAllLiteraryGenres(1, Number.MAX_SAFE_INTEGER);
    return [...result.items];
  }

  getById(id: string): Promise<LiteraryGenreModel | null> {
    return this.agent.getLiteraryGenreById(id);
  }

  async getPagedList(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<LiteraryGenreModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<LiteraryGenreModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllLiteraryGenres(pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  async getAllLiteraryGenres(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<LiteraryGenreModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<LiteraryGenreModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllLiteraryGenres(pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getLiteraryGenreById(literaryGenreId: string, fields?: string[]): Promise<LiteraryGenreModel | null> {
    return this.agent.getLiteraryGenreById(literaryGenreId, fields?.join(','));
  }

  existsLiteraryGenre(literaryGenreId: string): Promise<boolean> {
    return this.agent.existsLiteraryGenre(literaryGenreId);
  }

  checkLiteraryGenreNameUniqueness(name: string, excludeLiteraryGenreId?: string): Promise<boolean> {
    return this.agent.checkLiteraryGenreNameUniqueness(name, excludeLiteraryGenreId);
  }

  private buildOptions(
    spec?: Specification<LiteraryGenreModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): LiteraryGenreQueryOptions {
    const options: LiteraryGenreQueryOptions = {};
    if (spec instanceof QuerySpecification) {
      Object.assign(options, spec.toQueryParams());
    }
    if (sortFields?.length) options.sort = formatSortFields(sortFields);
    if (fields?.length) options.fields = fields.join(',');
    return options;
  }

  private toPagedList(source: { items: readonly LiteraryGenreModel[]; totalCount: number; currentPage: number; pageSize: number }): PagedList<LiteraryGenreModel> {
    return createPagedList([...source.items], source.totalCount, source.currentPage, source.pageSize);
  }
}

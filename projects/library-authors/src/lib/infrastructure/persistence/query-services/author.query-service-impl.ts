import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
  QuerySpecification,
  createPagedList,
  formatSortFields,
} from '@eac-arch/shared-kernel';
import type { AuthorQueryService } from '../../../application/contracts';
import type { AuthorModel } from '../../../application/models';
import { AuthorsHttpAgent } from '../../http-agents';
import type { AuthorQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class AuthorQueryServiceImpl implements AuthorQueryService {
  private readonly agent = inject(AuthorsHttpAgent);

  async getAll(): Promise<AuthorModel[]> {
    const result = await this.agent.getAllAuthors(1, Number.MAX_SAFE_INTEGER);
    return [...result.items];
  }

  getById(id: string): Promise<AuthorModel | null> {
    return this.agent.getAuthorById(id);
  }

  async getPagedList(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AuthorModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AuthorModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllAuthors(pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  async getAllAuthors(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AuthorModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AuthorModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllAuthors(pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getAuthorById(authorId: string, fields?: string[]): Promise<AuthorModel | null> {
    return this.agent.getAuthorById(authorId, fields?.join(','));
  }

  existsAuthor(authorId: string): Promise<boolean> {
    return this.agent.existsAuthor(authorId);
  }

  checkAuthorNameUniqueness(firstName: string, lastName: string, excludeAuthorId?: string): Promise<boolean> {
    return this.agent.checkAuthorNameUniqueness(firstName, lastName, excludeAuthorId);
  }

  private buildOptions(
    spec?: Specification<AuthorModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): AuthorQueryOptions {
    const options: AuthorQueryOptions = {};

    if (spec instanceof QuerySpecification) {
      Object.assign(options, spec.toQueryParams());
    }
    if (sortFields?.length) options.sort = formatSortFields(sortFields);
    if (fields?.length) options.fields = fields.join(',');

    return options;
  }

  private toPagedList(source: { items: readonly AuthorModel[]; totalCount: number; currentPage: number; pageSize: number }): PagedList<AuthorModel> {
    return createPagedList([...source.items], source.totalCount, source.currentPage, source.pageSize);
  }
}

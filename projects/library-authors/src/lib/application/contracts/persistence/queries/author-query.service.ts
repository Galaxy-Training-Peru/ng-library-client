import { InjectionToken } from '@angular/core';
import type { PagedList, QueryService, Specification, SortField } from '@eac-arch/shared-kernel';
import type { AuthorModel } from '../../../models';

export interface AuthorQueryService extends QueryService<AuthorModel> {
  getAllAuthors(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AuthorModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AuthorModel>>;

  getAuthorById(authorId: string, fields?: string[]): Promise<AuthorModel | null>;

  existsAuthor(authorId: string): Promise<boolean>;

  checkAuthorNameUniqueness(firstName: string, lastName: string, excludeAuthorId?: string): Promise<boolean>;
}

export const AUTHOR_QUERY_SERVICE = new InjectionToken<AuthorQueryService>('AuthorQueryService');

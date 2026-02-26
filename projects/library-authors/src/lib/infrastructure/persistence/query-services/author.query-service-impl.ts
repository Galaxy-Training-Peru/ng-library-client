import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
} from '@eac-arch/shared-kernel';
import { HttpQueryService } from '@eac-arch/infrastructure-persistence';
import type { AuthorQueryService } from '../../../application/contracts';
import type { AuthorModel } from '../../../application/models';
import { AuthorsHttpAgent } from '../../http-agents';
import type { AuthorQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class AuthorQueryServiceImpl
  extends HttpQueryService<AuthorModel, AuthorQueryOptions>
  implements AuthorQueryService {

  private readonly httpAgent = inject(AuthorsHttpAgent);

  // -- Base class hooks (root resource) --
  // Enables the inherited getAll(), getById() and getPagedList() methods.

  protected override doGetAll(pageNumber: number, pageSize: number, options?: AuthorQueryOptions) {
    return this.httpAgent.getAllAuthors(pageNumber, pageSize, options);
  }

  protected override doGetById(id: string) {
    return this.httpAgent.getAuthorById(id);
  }

  // -- AuthorQueryService-specific methods --

  getAllAuthors(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AuthorModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AuthorModel>> {
    return this.getPagedList(pageNumber, pageSize, spec, sortFields, fields);
  }

  getAuthorById(authorId: string, fields?: string[]): Promise<AuthorModel | null> {
    return this.httpAgent.getAuthorById(authorId, fields?.join(','));
  }

  existsAuthor(authorId: string): Promise<boolean> {
    return this.httpAgent.existsAuthor(authorId);
  }

  checkAuthorNameUniqueness(firstName: string, lastName: string, excludeAuthorId?: string): Promise<boolean> {
    return this.httpAgent.checkAuthorNameUniqueness(firstName, lastName, excludeAuthorId);
  }
}

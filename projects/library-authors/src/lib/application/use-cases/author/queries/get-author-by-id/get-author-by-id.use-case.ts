import { inject, Injectable } from '@angular/core';
import { defer, type Observable } from 'rxjs';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE, type AuthorQueryService } from '../../../contracts/persistence/queries';
import type { GetAuthorByIdQuery } from './get-author-by-id.query';
import type { GetAuthorByIdResult } from './get-author-by-id.result';

@Injectable({ providedIn: 'root' })
export class GetAuthorByIdUseCase implements QueryUseCase<GetAuthorByIdQuery, GetAuthorByIdResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);

  execute(query: GetAuthorByIdQuery): Observable<GetAuthorByIdResult> {
    return defer(async () => {
      const author = await this.authorQueryService.getAuthorById(query.authorId, query.fields);

      if (!author) {
        throw new Error(`Author with id '${query.authorId}' was not found`);
      }

      return author;
    });
  }
}

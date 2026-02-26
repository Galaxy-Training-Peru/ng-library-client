import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE, type AuthorQueryService } from '../../../../contracts/queries';
import type { GetAuthorByIdQuery } from './get-author-by-id.query';
import type { GetAuthorByIdResult } from './get-author-by-id.result';

@Injectable()
export class GetAuthorByIdUseCase implements QueryUseCase<GetAuthorByIdQuery, GetAuthorByIdResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);

  async execute(query: GetAuthorByIdQuery): Promise<GetAuthorByIdResult> {
    const author = await this.authorQueryService.getAuthorById(query.authorId, query.fields);

    if (!author) {
      throw new Error(`Author with id '${query.authorId}' was not found`);
    }

    return author;
  }
}

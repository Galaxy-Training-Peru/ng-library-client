import { inject, Injectable } from '@angular/core';
import type { QueryUseCase } from '@eac-arch/shared-kernel';
import { AUTHOR_QUERY_SERVICE, type AuthorQueryService } from '../../../../contracts/queries';
import type { ExistsAuthorQuery } from './exists-author.query';
import type { ExistsAuthorResult } from './exists-author.result';

@Injectable()
export class ExistsAuthorUseCase implements QueryUseCase<ExistsAuthorQuery, ExistsAuthorResult> {

  private readonly authorQueryService = inject(AUTHOR_QUERY_SERVICE);

  async execute(query: ExistsAuthorQuery): Promise<ExistsAuthorResult> {
    const exists = await this.authorQueryService.existsAuthor(query.authorId);

    return {
      authorId: query.authorId,
      exists,
    };
  }
}

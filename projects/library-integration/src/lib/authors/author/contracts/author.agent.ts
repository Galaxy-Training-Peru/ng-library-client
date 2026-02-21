import { InjectionToken } from '@angular/core';
import type { GetAllAuthorsRequest, GetAllAuthorsResponse } from './get-all-authors';
import type { GetAuthorByIdRequest, GetAuthorByIdResponse } from './get-author-by-id';
import type { ExistsAuthorRequest, ExistsAuthorResponse } from './exists-author';
import type { CheckAuthorNameUniquenessRequest, CheckAuthorNameUniquenessResponse } from './check-author-name-uniqueness';

export interface AuthorAgent {
  getAllAuthors(request: GetAllAuthorsRequest): Promise<GetAllAuthorsResponse>;
  getAuthorById(request: GetAuthorByIdRequest): Promise<GetAuthorByIdResponse>;
  existsAuthor(request: ExistsAuthorRequest): Promise<ExistsAuthorResponse>;
  checkAuthorNameUniqueness(request: CheckAuthorNameUniquenessRequest): Promise<CheckAuthorNameUniquenessResponse>;
}

export const AUTHOR_AGENT = new InjectionToken<AuthorAgent>('AuthorAgent');

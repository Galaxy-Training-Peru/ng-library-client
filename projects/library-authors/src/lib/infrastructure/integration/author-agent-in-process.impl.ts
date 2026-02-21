import { inject, Injectable } from '@angular/core';
import { AUTHORS_PUBLIC_API, type AuthorsPublicApi } from '../../application/public-api';
import type { AuthorAgent } from 'library-integration';
import type {
  GetAllAuthorsRequest,
  GetAllAuthorsResponse,
  GetAuthorByIdRequest,
  GetAuthorByIdResponse,
  ExistsAuthorRequest,
  ExistsAuthorResponse,
  CheckAuthorNameUniquenessRequest,
  CheckAuthorNameUniquenessResponse,
} from 'library-integration';

@Injectable()
export class AuthorAgentInProcessImpl implements AuthorAgent {
  private readonly api = inject<AuthorsPublicApi>(AUTHORS_PUBLIC_API);

  getAllAuthors(request: GetAllAuthorsRequest): Promise<GetAllAuthorsResponse> {
    return this.api.getAllAuthors(request) as Promise<GetAllAuthorsResponse>;
  }

  getAuthorById(request: GetAuthorByIdRequest): Promise<GetAuthorByIdResponse> {
    return this.api.getAuthorById(request) as Promise<GetAuthorByIdResponse>;
  }

  existsAuthor(request: ExistsAuthorRequest): Promise<ExistsAuthorResponse> {
    return this.api.existsAuthor(request) as Promise<ExistsAuthorResponse>;
  }

  checkAuthorNameUniqueness(request: CheckAuthorNameUniquenessRequest): Promise<CheckAuthorNameUniquenessResponse> {
    return this.api.checkAuthorNameUniqueness(request) as Promise<CheckAuthorNameUniquenessResponse>;
  }
}

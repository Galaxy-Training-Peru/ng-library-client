import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList } from '@eac-arch/infrastructure-http';
import type { AuthorModel } from '../../application/models';
import { AuthorsHttpClient } from '../rest-clients';
import type { GetAllAuthorsHttpRequest } from '../rest-clients';

export interface AuthorQueryOptions {
  sort?: string;
  search?: string;
  firstName?: string;
  lastName?: string;
  literaryGenreId?: string;
  fields?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthorsHttpAgent {
  private readonly httpClient = inject(AuthorsHttpClient);

  async getAllAuthors(pageNumber: number, pageSize: number, options?: AuthorQueryOptions): Promise<PagedList<AuthorModel>> {
    const request: GetAllAuthorsHttpRequest = { pageNumber, pageSize, ...options };
    const result = await this.httpClient.getAllAuthors(request);

    return PagedList.create<AuthorModel>(
      result.items.map(dto => ({ ...dto })),
      result.totalCount,
      result.currentPage,
      result.pageSize,
    );
  }

  async getAuthorById(authorId: string, fields?: string): Promise<AuthorModel | null> {
    try {
      const response = await this.httpClient.getAuthorById({ authorId, fields });
      return { ...response.data };
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async existsAuthor(authorId: string): Promise<boolean> {
    const response = await this.httpClient.existsAuthor({ authorId });
    return response.data.exists;
  }

  async checkAuthorNameUniqueness(firstName: string, lastName: string, excludeAuthorId?: string): Promise<boolean> {
    const response = await this.httpClient.checkAuthorNameUniqueness({ firstName, lastName, excludeAuthorId });
    return response.data.isUnique;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList, type JsonPatchOperation } from '@eac-arch/infrastructure-http';
import type { AuthorModel } from '../../application/models';
import {
  AuthorsHttpClient,
  type GetAllAuthorsHttpRequest,
  type CreateAuthorHttpRequest,
  type UpsertAuthorHttpRequest,
} from '../rest-clients';
import type { AuthorQueryOptions, CreateAuthorData, UpsertAuthorData } from './contracts';

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

  async createAuthor(data: CreateAuthorData): Promise<AuthorModel> {
    const request: CreateAuthorHttpRequest = { ...data };
    const dto = await this.httpClient.createAuthor(request);
    return { ...dto };
  }

  async upsertAuthor(authorId: string, data: UpsertAuthorData): Promise<AuthorModel | null> {
    const request: UpsertAuthorHttpRequest = { authorId, ...data };
    const dto = await this.httpClient.upsertAuthor(request);
    return dto ? { ...dto } : null;
  }

  async updatePartialAuthor(authorId: string, operations: JsonPatchOperation[]): Promise<void> {
    await this.httpClient.updatePartialAuthor({ authorId, operations });
  }

  async deleteAuthor(authorId: string): Promise<void> {
    await this.httpClient.deleteAuthor({ authorId });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@eac-arch/infrastructure-config';
import type {
  GetAllAuthorsHttpRequest,
  GetAllAuthorsHttpResponse,
  GetAuthorByIdHttpRequest,
  GetAuthorByIdHttpResponse,
} from './contracts/author-http.contracts';
import type { AuthorDto } from './dtos/author.dto';
import type { PaginationMeta } from './dtos/pagination-meta';

// Low-level HTTP client for the Authors REST API.
// Handles query params, X-Pagination header parsing, and raw DTO deserialization.
@Injectable({ providedIn: 'root' })
export class AuthorsHttpClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  private get baseUrl(): string {
    return `${this.config.get<string>('LIBRARY_URL')}/authors`;
  }

  async getAllAuthors(request: GetAllAuthorsHttpRequest): Promise<GetAllAuthorsHttpResponse> {
    let params = new HttpParams();

    if (request.pageNumber != null) params = params.set('pageNumber', request.pageNumber);
    if (request.pageSize != null) params = params.set('pageSize', request.pageSize);
    if (request.sort) params = params.set('sort', request.sort);
    if (request.search) params = params.set('search', request.search);
    if (request.firstName) params = params.set('firstName', request.firstName);
    if (request.lastName) params = params.set('lastName', request.lastName);
    if (request.literaryGenreId) params = params.set('literaryGenreId', request.literaryGenreId);

    const response = await firstValueFrom(
      this.http.get<AuthorDto[]>(this.baseUrl, { params, observe: 'response' }),
    );

    const paginationHeader = response.headers.get('X-Pagination');
    const pagination: PaginationMeta = paginationHeader
      ? JSON.parse(paginationHeader)
      : { currentPage: 1, totalPages: 1, pageSize: 10, totalCount: 0, hasPrevious: false, hasNext: false };

    return { data: response.body ?? [], pagination };
  }

  async getAuthorById(request: GetAuthorByIdHttpRequest): Promise<GetAuthorByIdHttpResponse> {
    let params = new HttpParams();

    if (request.fields) params = params.set('fields', request.fields);

    const data = await firstValueFrom(
      this.http.get<AuthorDto>(`${this.baseUrl}/${request.authorId}`, { params }),
    );

    return { data };
  }
}

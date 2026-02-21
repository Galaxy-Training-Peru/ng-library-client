import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@eac-arch/infrastructure-config';
import { PagedList } from '@eac-arch/infrastructure-http';
import type {
  GetAllAuthorsHttpRequest,
  GetAllAuthorsHttpResponse,
  GetAuthorByIdHttpRequest,
  GetAuthorByIdHttpResponse,
  ExistsAuthorHttpRequest,
  ExistsAuthorHttpResponse,
  CheckAuthorNameUniquenessHttpRequest,
  CheckAuthorNameUniquenessHttpResponse,
} from './contracts';
import type { AuthorDto } from './dtos';

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
    if (request.fields) params = params.set('fields', request.fields);

    const response = await firstValueFrom(
      this.http.get<{ data: AuthorDto[] }>(this.baseUrl, { params, observe: 'response' }),
    );

    const raw = response.headers.get('X-Pagination');
    const pagination = raw ? JSON.parse(raw) : null;

    return pagination
      ? PagedList.create<AuthorDto>(response.body!.data, pagination.totalCount, pagination.currentPage, pagination.pageSize)
      : PagedList.empty<AuthorDto>();
  }

  async getAuthorById(request: GetAuthorByIdHttpRequest): Promise<GetAuthorByIdHttpResponse> {
    let params = new HttpParams();

    if (request.fields) params = params.set('fields', request.fields);

    return firstValueFrom(
      this.http.get<GetAuthorByIdHttpResponse>(`${this.baseUrl}/${request.authorId}`, { params }),
    );
  }

  async existsAuthor(request: ExistsAuthorHttpRequest): Promise<ExistsAuthorHttpResponse> {
    return firstValueFrom(
      this.http.get<ExistsAuthorHttpResponse>(`${this.baseUrl}/${request.authorId}/exists`),
    );
  }

  async checkAuthorNameUniqueness(request: CheckAuthorNameUniquenessHttpRequest): Promise<CheckAuthorNameUniquenessHttpResponse> {
    return firstValueFrom(
      this.http.post<CheckAuthorNameUniquenessHttpResponse>(`${this.baseUrl}/check-uniqueness`, request),
    );
  }
}

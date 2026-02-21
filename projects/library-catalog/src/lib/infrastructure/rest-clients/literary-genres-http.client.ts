import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@eac-arch/infrastructure-config';
import { PagedList } from '@eac-arch/infrastructure-http';
import type {
  GetAllLiteraryGenresHttpRequest,
  GetAllLiteraryGenresHttpResponse,
  GetLiteraryGenreByIdHttpRequest,
  GetLiteraryGenreByIdHttpResponse,
  ExistsLiteraryGenreHttpRequest,
  ExistsLiteraryGenreHttpResponse,
  CheckLiteraryGenreNameUniquenessHttpRequest,
  CheckLiteraryGenreNameUniquenessHttpResponse,
} from './contracts';
import type { LiteraryGenreDto } from './dtos';

// Low-level HTTP client for the LiteraryGenres REST API.
// Handles query params, X-Pagination header parsing, and raw DTO deserialization.
@Injectable({ providedIn: 'root' })
export class LiteraryGenresHttpClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  private get baseUrl(): string {
    return `${this.config.get<string>('LIBRARY_URL')}/catalog/literary-genres`;
  }

  async getAllLiteraryGenres(request: GetAllLiteraryGenresHttpRequest): Promise<GetAllLiteraryGenresHttpResponse> {
    let params = new HttpParams();

    if (request.pageNumber != null) params = params.set('pageNumber', request.pageNumber);
    if (request.pageSize != null) params = params.set('pageSize', request.pageSize);
    if (request.sort) params = params.set('sort', request.sort);
    if (request.search) params = params.set('search', request.search);
    if (request.fields) params = params.set('fields', request.fields);

    const response = await firstValueFrom(
      this.http.get<{ data: LiteraryGenreDto[] }>(this.baseUrl, { params, observe: 'response' }),
    );

    const raw = response.headers.get('X-Pagination');
    const pagination = raw ? JSON.parse(raw) : null;

    return pagination
      ? PagedList.create<LiteraryGenreDto>(response.body!.data, pagination.totalCount, pagination.currentPage, pagination.pageSize)
      : PagedList.empty<LiteraryGenreDto>();
  }

  async getLiteraryGenreById(request: GetLiteraryGenreByIdHttpRequest): Promise<GetLiteraryGenreByIdHttpResponse> {
    let params = new HttpParams();

    if (request.fields) params = params.set('fields', request.fields);

    return firstValueFrom(
      this.http.get<GetLiteraryGenreByIdHttpResponse>(`${this.baseUrl}/${request.literaryGenreId}`, { params }),
    );
  }

  async existsLiteraryGenre(request: ExistsLiteraryGenreHttpRequest): Promise<ExistsLiteraryGenreHttpResponse> {
    return firstValueFrom(
      this.http.get<ExistsLiteraryGenreHttpResponse>(`${this.baseUrl}/${request.literaryGenreId}/exists`),
    );
  }

  async checkLiteraryGenreNameUniqueness(request: CheckLiteraryGenreNameUniquenessHttpRequest): Promise<CheckLiteraryGenreNameUniquenessHttpResponse> {
    return firstValueFrom(
      this.http.post<CheckLiteraryGenreNameUniquenessHttpResponse>(`${this.baseUrl}/check-uniqueness`, request),
    );
  }
}

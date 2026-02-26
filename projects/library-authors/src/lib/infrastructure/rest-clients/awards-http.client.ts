import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@eac-arch/infrastructure-config';
import { PagedList } from '@eac-arch/infrastructure-http';
import type {
  GetAllAwardsOfAuthorHttpRequest,
  GetAllAwardsOfAuthorHttpResponse,
  GetAwardOfAuthorByAwardIdHttpRequest,
  GetAwardOfAuthorByAwardIdHttpResponse,
  ExistsAwardOfAuthorHttpRequest,
  ExistsAwardOfAuthorHttpResponse,
  CheckAwardTitleUniquenessOfAuthorHttpRequest,
  CheckAwardTitleUniquenessOfAuthorHttpResponse,
  AddAwardToAuthorHttpRequest,
  AddAwardToAuthorHttpResponse,
  UpsertAwardOfAuthorHttpRequest,
  UpsertAwardOfAuthorHttpResponse,
  UpdatePartialAwardOfAuthorHttpRequest,
  RemoveAwardFromAuthorHttpRequest,
} from './contracts';
import type { AwardDto } from './dtos';

// Low-level HTTP client for the Awards REST API (sub-resource of Authors).
@Injectable({ providedIn: 'root' })
export class AwardsHttpClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  private awardsUrl(authorId: string): string {
    return `${this.config.get<string>('LIBRARY_URL')}/authors/${authorId}/awards`;
  }

  async getAllAwardsOfAuthor(request: GetAllAwardsOfAuthorHttpRequest): Promise<GetAllAwardsOfAuthorHttpResponse> {
    let params = new HttpParams();

    if (request.pageNumber != null) params = params.set('pageNumber', request.pageNumber);
    if (request.pageSize != null) params = params.set('pageSize', request.pageSize);
    if (request.sort) params = params.set('sort', request.sort);
    if (request.search) params = params.set('search', request.search);
    if (request.title) params = params.set('title', request.title);
    if (request.awardedYear != null) params = params.set('awardedYear', request.awardedYear);
    if (request.fields) params = params.set('fields', request.fields);

    const response = await firstValueFrom(
      this.http.get<{ data: AwardDto[] }>(this.awardsUrl(request.authorId), { params, observe: 'response' }),
    );

    const raw = response.headers.get('X-Pagination');
    const pagination = raw ? JSON.parse(raw) : null;

    return pagination
      ? PagedList.create<AwardDto>(response.body!.data, pagination.totalCount, pagination.currentPage, pagination.pageSize)
      : PagedList.empty<AwardDto>();
  }

  async getAwardOfAuthorByAwardId(request: GetAwardOfAuthorByAwardIdHttpRequest): Promise<GetAwardOfAuthorByAwardIdHttpResponse> {
    let params = new HttpParams();

    if (request.fields) params = params.set('fields', request.fields);

    return firstValueFrom(
      this.http.get<GetAwardOfAuthorByAwardIdHttpResponse>(
        `${this.awardsUrl(request.authorId)}/${request.awardId}`,
        { params },
      ),
    );
  }

  async existsAwardOfAuthor(request: ExistsAwardOfAuthorHttpRequest): Promise<ExistsAwardOfAuthorHttpResponse> {
    return firstValueFrom(
      this.http.get<ExistsAwardOfAuthorHttpResponse>(
        `${this.awardsUrl(request.authorId)}/${request.awardId}/exists`,
      ),
    );
  }

  async checkAwardTitleUniquenessOfAuthor(request: CheckAwardTitleUniquenessOfAuthorHttpRequest): Promise<CheckAwardTitleUniquenessOfAuthorHttpResponse> {
    return firstValueFrom(
      this.http.post<CheckAwardTitleUniquenessOfAuthorHttpResponse>(
        `${this.awardsUrl(request.authorId)}/check-uniqueness`,
        request,
      ),
    );
  }

  async addAwardToAuthor(request: AddAwardToAuthorHttpRequest): Promise<AddAwardToAuthorHttpResponse> {
    const response = await firstValueFrom(
      this.http.post<{ data: AddAwardToAuthorHttpResponse }>(this.awardsUrl(request.authorId), request),
    );
    return response.data;
  }

  async upsertAwardOfAuthor(request: UpsertAwardOfAuthorHttpRequest): Promise<UpsertAwardOfAuthorHttpResponse> {
    const { authorId, awardId, ...body } = request;
    const response = await firstValueFrom(
      this.http.put<{ data: NonNullable<UpsertAwardOfAuthorHttpResponse> } | null>(
        `${this.awardsUrl(authorId)}/${awardId}`,
        body,
        { observe: 'response' },
      ),
    );
    return response.status === 201 ? response.body!.data : null;
  }

  async updatePartialAwardOfAuthor(request: UpdatePartialAwardOfAuthorHttpRequest): Promise<void> {
    await firstValueFrom(
      this.http.patch(
        `${this.awardsUrl(request.authorId)}/${request.awardId}`,
        request.operations,
        { headers: { 'Content-Type': 'application/json-patch+json' } },
      ),
    );
  }

  async removeAwardFromAuthor(request: RemoveAwardFromAuthorHttpRequest): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.awardsUrl(request.authorId)}/${request.awardId}`),
    );
  }
}

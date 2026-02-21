import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@eac-arch/infrastructure-config';
import { PagedList } from '@eac-arch/infrastructure-http';
import type {
  GetAllAffiliationsOfAuthorHttpRequest,
  GetAllAffiliationsOfAuthorHttpResponse,
  GetAffiliationOfAuthorByAffiliationIdHttpRequest,
  GetAffiliationOfAuthorByAffiliationIdHttpResponse,
  ExistsAffiliationOfAuthorHttpRequest,
  ExistsAffiliationOfAuthorHttpResponse,
  CheckAffiliationNameUniquenessOfAuthorHttpRequest,
  CheckAffiliationNameUniquenessOfAuthorHttpResponse,
} from './contracts';
import type { AffiliationDto } from './dtos';

// Low-level HTTP client for the Affiliations REST API (sub-resource of Authors).
@Injectable({ providedIn: 'root' })
export class AffiliationsHttpClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  private affiliationsUrl(authorId: string): string {
    return `${this.config.get<string>('LIBRARY_URL')}/authors/${authorId}/affiliations`;
  }

  async getAllAffiliationsOfAuthor(request: GetAllAffiliationsOfAuthorHttpRequest): Promise<GetAllAffiliationsOfAuthorHttpResponse> {
    let params = new HttpParams();

    if (request.pageNumber != null) params = params.set('pageNumber', request.pageNumber);
    if (request.pageSize != null) params = params.set('pageSize', request.pageSize);
    if (request.sort) params = params.set('sort', request.sort);
    if (request.search) params = params.set('search', request.search);
    if (request.institutionName) params = params.set('institutionName', request.institutionName);
    if (request.activeOn) params = params.set('activeOn', request.activeOn);
    if (request.fields) params = params.set('fields', request.fields);

    const response = await firstValueFrom(
      this.http.get<{ data: AffiliationDto[] }>(this.affiliationsUrl(request.authorId), { params, observe: 'response' }),
    );

    const raw = response.headers.get('X-Pagination');
    const pagination = raw ? JSON.parse(raw) : null;

    return pagination
      ? PagedList.create<AffiliationDto>(response.body!.data, pagination.totalCount, pagination.currentPage, pagination.pageSize)
      : PagedList.empty<AffiliationDto>();
  }

  async getAffiliationOfAuthorByAffiliationId(request: GetAffiliationOfAuthorByAffiliationIdHttpRequest): Promise<GetAffiliationOfAuthorByAffiliationIdHttpResponse> {
    let params = new HttpParams();

    if (request.fields) params = params.set('fields', request.fields);

    return firstValueFrom(
      this.http.get<GetAffiliationOfAuthorByAffiliationIdHttpResponse>(
        `${this.affiliationsUrl(request.authorId)}/${request.affiliationId}`,
        { params },
      ),
    );
  }

  async existsAffiliationOfAuthor(request: ExistsAffiliationOfAuthorHttpRequest): Promise<ExistsAffiliationOfAuthorHttpResponse> {
    return firstValueFrom(
      this.http.get<ExistsAffiliationOfAuthorHttpResponse>(
        `${this.affiliationsUrl(request.authorId)}/${request.affiliationId}/exists`,
      ),
    );
  }

  async checkAffiliationNameUniquenessOfAuthor(request: CheckAffiliationNameUniquenessOfAuthorHttpRequest): Promise<CheckAffiliationNameUniquenessOfAuthorHttpResponse> {
    return firstValueFrom(
      this.http.post<CheckAffiliationNameUniquenessOfAuthorHttpResponse>(
        `${this.affiliationsUrl(request.authorId)}/check-uniqueness`,
        request,
      ),
    );
  }
}

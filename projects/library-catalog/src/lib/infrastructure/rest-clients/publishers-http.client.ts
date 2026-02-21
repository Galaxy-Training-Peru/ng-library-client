import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@eac-arch/infrastructure-config';
import { PagedList } from '@eac-arch/infrastructure-http';
import type {
  GetAllPublishersHttpRequest,
  GetAllPublishersHttpResponse,
  GetPublisherByIdHttpRequest,
  GetPublisherByIdHttpResponse,
  ExistsPublisherHttpRequest,
  ExistsPublisherHttpResponse,
  CheckPublisherNameUniquenessHttpRequest,
  CheckPublisherNameUniquenessHttpResponse,
} from './contracts';
import type { PublisherDto } from './dtos';

// Low-level HTTP client for the Publishers REST API.
// Handles query params, X-Pagination header parsing, and raw DTO deserialization.
@Injectable({ providedIn: 'root' })
export class PublishersHttpClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  private get baseUrl(): string {
    return `${this.config.get<string>('LIBRARY_URL')}/catalog/publishers`;
  }

  async getAllPublishers(request: GetAllPublishersHttpRequest): Promise<GetAllPublishersHttpResponse> {
    let params = new HttpParams();

    if (request.pageNumber != null) params = params.set('pageNumber', request.pageNumber);
    if (request.pageSize != null) params = params.set('pageSize', request.pageSize);
    if (request.sort) params = params.set('sort', request.sort);
    if (request.search) params = params.set('search', request.search);
    if (request.fields) params = params.set('fields', request.fields);

    const response = await firstValueFrom(
      this.http.get<{ data: PublisherDto[] }>(this.baseUrl, { params, observe: 'response' }),
    );

    const raw = response.headers.get('X-Pagination');
    const pagination = raw ? JSON.parse(raw) : null;

    return pagination
      ? PagedList.create<PublisherDto>(response.body!.data, pagination.totalCount, pagination.currentPage, pagination.pageSize)
      : PagedList.empty<PublisherDto>();
  }

  async getPublisherById(request: GetPublisherByIdHttpRequest): Promise<GetPublisherByIdHttpResponse> {
    let params = new HttpParams();

    if (request.fields) params = params.set('fields', request.fields);

    return firstValueFrom(
      this.http.get<GetPublisherByIdHttpResponse>(`${this.baseUrl}/${request.publisherId}`, { params }),
    );
  }

  async existsPublisher(request: ExistsPublisherHttpRequest): Promise<ExistsPublisherHttpResponse> {
    return firstValueFrom(
      this.http.get<ExistsPublisherHttpResponse>(`${this.baseUrl}/${request.publisherId}/exists`),
    );
  }

  async checkPublisherNameUniqueness(request: CheckPublisherNameUniquenessHttpRequest): Promise<CheckPublisherNameUniquenessHttpResponse> {
    return firstValueFrom(
      this.http.post<CheckPublisherNameUniquenessHttpResponse>(`${this.baseUrl}/check-uniqueness`, request),
    );
  }
}

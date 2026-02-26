import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@eac-arch/infrastructure-config';
import { PagedList } from '@eac-arch/infrastructure-http';
import type {
  GetAllPapersOfAuthorHttpRequest,
  GetAllPapersOfAuthorHttpResponse,
  GetPaperOfAuthorByPaperIdHttpRequest,
  GetPaperOfAuthorByPaperIdHttpResponse,
  ExistsPaperOfAuthorHttpRequest,
  ExistsPaperOfAuthorHttpResponse,
  CheckPaperTitleUniquenessOfAuthorHttpRequest,
  CheckPaperTitleUniquenessOfAuthorHttpResponse,
  AddPaperToAuthorHttpRequest,
  AddPaperToAuthorHttpResponse,
  UpsertPaperOfAuthorHttpRequest,
  UpsertPaperOfAuthorHttpResponse,
  UpdatePartialPaperOfAuthorHttpRequest,
  RemovePaperFromAuthorHttpRequest,
} from './contracts';
import type { PaperDto } from './dtos';

// Low-level HTTP client for the Papers REST API (sub-resource of Authors).
@Injectable({ providedIn: 'root' })
export class PapersHttpClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  private papersUrl(authorId: string): string {
    return `${this.config.get<string>('LIBRARY_URL')}/authors/${authorId}/papers`;
  }

  async getAllPapersOfAuthor(request: GetAllPapersOfAuthorHttpRequest): Promise<GetAllPapersOfAuthorHttpResponse> {
    let params = new HttpParams();

    if (request.pageNumber != null) params = params.set('pageNumber', request.pageNumber);
    if (request.pageSize != null) params = params.set('pageSize', request.pageSize);
    if (request.sort) params = params.set('sort', request.sort);
    if (request.search) params = params.set('search', request.search);
    if (request.title) params = params.set('title', request.title);
    if (request.publishedYear != null) params = params.set('publishedYear', request.publishedYear);
    if (request.fields) params = params.set('fields', request.fields);

    const response = await firstValueFrom(
      this.http.get<{ data: PaperDto[] }>(this.papersUrl(request.authorId), { params, observe: 'response' }),
    );

    const raw = response.headers.get('X-Pagination');
    const pagination = raw ? JSON.parse(raw) : null;

    return pagination
      ? PagedList.create<PaperDto>(response.body!.data, pagination.totalCount, pagination.currentPage, pagination.pageSize)
      : PagedList.empty<PaperDto>();
  }

  async getPaperOfAuthorByPaperId(request: GetPaperOfAuthorByPaperIdHttpRequest): Promise<GetPaperOfAuthorByPaperIdHttpResponse> {
    let params = new HttpParams();

    if (request.fields) params = params.set('fields', request.fields);

    return firstValueFrom(
      this.http.get<GetPaperOfAuthorByPaperIdHttpResponse>(
        `${this.papersUrl(request.authorId)}/${request.paperId}`,
        { params },
      ),
    );
  }

  async existsPaperOfAuthor(request: ExistsPaperOfAuthorHttpRequest): Promise<ExistsPaperOfAuthorHttpResponse> {
    return firstValueFrom(
      this.http.get<ExistsPaperOfAuthorHttpResponse>(
        `${this.papersUrl(request.authorId)}/${request.paperId}/exists`,
      ),
    );
  }

  async checkPaperTitleUniquenessOfAuthor(request: CheckPaperTitleUniquenessOfAuthorHttpRequest): Promise<CheckPaperTitleUniquenessOfAuthorHttpResponse> {
    return firstValueFrom(
      this.http.post<CheckPaperTitleUniquenessOfAuthorHttpResponse>(
        `${this.papersUrl(request.authorId)}/check-uniqueness`,
        request,
      ),
    );
  }

  async addPaperToAuthor(request: AddPaperToAuthorHttpRequest): Promise<AddPaperToAuthorHttpResponse> {
    const response = await firstValueFrom(
      this.http.post<{ data: AddPaperToAuthorHttpResponse }>(this.papersUrl(request.authorId), request),
    );
    return response.data;
  }

  async upsertPaperOfAuthor(request: UpsertPaperOfAuthorHttpRequest): Promise<UpsertPaperOfAuthorHttpResponse> {
    const { authorId, paperId, ...body } = request;
    const response = await firstValueFrom(
      this.http.put<{ data: NonNullable<UpsertPaperOfAuthorHttpResponse> } | null>(
        `${this.papersUrl(authorId)}/${paperId}`,
        body,
        { observe: 'response' },
      ),
    );
    return response.status === 201 ? response.body!.data : null;
  }

  async updatePartialPaperOfAuthor(request: UpdatePartialPaperOfAuthorHttpRequest): Promise<void> {
    await firstValueFrom(
      this.http.patch(
        `${this.papersUrl(request.authorId)}/${request.paperId}`,
        request.operations,
        { headers: { 'Content-Type': 'application/json-patch+json' } },
      ),
    );
  }

  async removePaperFromAuthor(request: RemovePaperFromAuthorHttpRequest): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.papersUrl(request.authorId)}/${request.paperId}`),
    );
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList, type JsonPatchOperation } from '@eac-arch/infrastructure-http';
import type { PaperModel } from '../../application/models';
import {
  PapersHttpClient,
  type GetAllPapersOfAuthorHttpRequest,
  type AddPaperToAuthorHttpRequest,
  type UpsertPaperOfAuthorHttpRequest,
} from '../rest-clients';
import type { PaperQueryOptions, AddPaperData, UpsertPaperData } from './contracts';

@Injectable({ providedIn: 'root' })
export class PapersHttpAgent {
  private readonly httpClient = inject(PapersHttpClient);

  async getAllPapersOfAuthor(authorId: string, pageNumber: number, pageSize: number, options?: PaperQueryOptions): Promise<PagedList<PaperModel>> {
    const request: GetAllPapersOfAuthorHttpRequest = { authorId, pageNumber, pageSize, ...options };
    const result = await this.httpClient.getAllPapersOfAuthor(request);

    return PagedList.create<PaperModel>(
      result.items.map(dto => ({ ...dto })),
      result.totalCount,
      result.currentPage,
      result.pageSize,
    );
  }

  async getPaperOfAuthorByPaperId(authorId: string, paperId: string, fields?: string): Promise<PaperModel | null> {
    try {
      const response = await this.httpClient.getPaperOfAuthorByPaperId({ authorId, paperId, fields });
      return { ...response.data };
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async existsPaperOfAuthor(authorId: string, paperId: string): Promise<boolean> {
    const response = await this.httpClient.existsPaperOfAuthor({ authorId, paperId });
    return response.data.exists;
  }

  async checkPaperTitleUniquenessOfAuthor(authorId: string, title: string, excludePaperId?: string): Promise<boolean> {
    const response = await this.httpClient.checkPaperTitleUniquenessOfAuthor({ authorId, title, excludePaperId });
    return response.data.isUnique;
  }

  async addPaperToAuthor(authorId: string, data: AddPaperData): Promise<PaperModel> {
    const request: AddPaperToAuthorHttpRequest = { authorId, ...data };
    const dto = await this.httpClient.addPaperToAuthor(request);
    return { ...dto };
  }

  async upsertPaperOfAuthor(authorId: string, paperId: string, data: UpsertPaperData): Promise<PaperModel | null> {
    const request: UpsertPaperOfAuthorHttpRequest = { authorId, paperId, ...data };
    const dto = await this.httpClient.upsertPaperOfAuthor(request);
    return dto ? { ...dto } : null;
  }

  async updatePartialPaperOfAuthor(authorId: string, paperId: string, operations: JsonPatchOperation[]): Promise<void> {
    await this.httpClient.updatePartialPaperOfAuthor({ authorId, paperId, operations });
  }

  async removePaperFromAuthor(authorId: string, paperId: string): Promise<void> {
    await this.httpClient.removePaperFromAuthor({ authorId, paperId });
  }
}

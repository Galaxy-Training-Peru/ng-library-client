import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList } from '@eac-arch/infrastructure-http';
import type { PaperModel } from '../../application/models';
import { PapersHttpClient } from '../rest-clients';
import type { GetAllPapersOfAuthorHttpRequest } from '../rest-clients';

export interface PaperQueryOptions {
  sort?: string;
  search?: string;
  title?: string;
  publishedYear?: number;
  fields?: string;
}

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
}

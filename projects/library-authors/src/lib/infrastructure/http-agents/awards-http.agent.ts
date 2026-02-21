import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList } from '@eac-arch/infrastructure-http';
import type { AwardModel } from '../../application/models';
import { AwardsHttpClient, type GetAllAwardsOfAuthorHttpRequest } from '../rest-clients';

export interface AwardQueryOptions {
  sort?: string;
  search?: string;
  title?: string;
  awardedYear?: number;
  fields?: string;
}

@Injectable({ providedIn: 'root' })
export class AwardsHttpAgent {
  private readonly httpClient = inject(AwardsHttpClient);

  async getAllAwardsOfAuthor(authorId: string, pageNumber: number, pageSize: number, options?: AwardQueryOptions): Promise<PagedList<AwardModel>> {
    const request: GetAllAwardsOfAuthorHttpRequest = { authorId, pageNumber, pageSize, ...options };
    const result = await this.httpClient.getAllAwardsOfAuthor(request);

    return PagedList.create<AwardModel>(
      result.items.map(dto => ({ ...dto })),
      result.totalCount,
      result.currentPage,
      result.pageSize,
    );
  }

  async getAwardOfAuthorByAwardId(authorId: string, awardId: string, fields?: string): Promise<AwardModel | null> {
    try {
      const response = await this.httpClient.getAwardOfAuthorByAwardId({ authorId, awardId, fields });
      return { ...response.data };
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async existsAwardOfAuthor(authorId: string, awardId: string): Promise<boolean> {
    const response = await this.httpClient.existsAwardOfAuthor({ authorId, awardId });
    return response.data.exists;
  }

  async checkAwardTitleUniquenessOfAuthor(authorId: string, title: string, excludeAwardId?: string): Promise<boolean> {
    const response = await this.httpClient.checkAwardTitleUniquenessOfAuthor({ authorId, title, excludeAwardId });
    return response.data.isUnique;
  }
}

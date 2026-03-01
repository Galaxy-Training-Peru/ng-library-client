import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList, type JsonPatchOperation } from '@eac-arch/infrastructure-http';
import type { AwardDto } from '../rest-clients/dtos';
import {
  AwardsHttpClient,
  type GetAllAwardsOfAuthorHttpRequest,
  type AddAwardToAuthorHttpRequest,
  type UpsertAwardOfAuthorHttpRequest,
} from '../rest-clients';
import type { AwardQueryOptions, AddAwardData, UpsertAwardData } from './contracts';

@Injectable({ providedIn: 'root' })
export class AwardsHttpAgent {
  private readonly httpClient = inject(AwardsHttpClient);

  async getAllAwardsOfAuthor(authorId: string, pageNumber: number, pageSize: number, options?: AwardQueryOptions): Promise<PagedList<AwardDto>> {
    const request: GetAllAwardsOfAuthorHttpRequest = { authorId, pageNumber, pageSize, ...options };
    const result = await this.httpClient.getAllAwardsOfAuthor(request);

    return PagedList.create<AwardDto>(
      result.items.map(dto => ({ ...dto })),
      result.totalCount,
      result.currentPage,
      result.pageSize,
    );
  }

  async getAwardOfAuthorByAwardId(authorId: string, awardId: string, fields?: string): Promise<AwardDto | null> {
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

  async addAwardToAuthor(authorId: string, data: AddAwardData): Promise<AwardDto> {
    const request: AddAwardToAuthorHttpRequest = { authorId, ...data };
    const dto = await this.httpClient.addAwardToAuthor(request);
    return { ...dto };
  }

  async upsertAwardOfAuthor(authorId: string, awardId: string, data: UpsertAwardData): Promise<AwardDto | null> {
    const request: UpsertAwardOfAuthorHttpRequest = { authorId, awardId, ...data };
    const dto = await this.httpClient.upsertAwardOfAuthor(request);
    return dto ? { ...dto } : null;
  }

  async updatePartialAwardOfAuthor(authorId: string, awardId: string, operations: JsonPatchOperation[]): Promise<void> {
    await this.httpClient.updatePartialAwardOfAuthor({ authorId, awardId, operations });
  }

  async removeAwardFromAuthor(authorId: string, awardId: string): Promise<void> {
    await this.httpClient.removeAwardFromAuthor({ authorId, awardId });
  }
}

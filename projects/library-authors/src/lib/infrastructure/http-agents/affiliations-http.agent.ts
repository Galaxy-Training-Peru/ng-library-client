import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList, type JsonPatchOperation } from '@eac-arch/infrastructure-http';
import type { AffiliationDto } from '../rest-clients/dtos';
import {
  AffiliationsHttpClient,
  type GetAllAffiliationsOfAuthorHttpRequest,
  type AddAffiliationToAuthorHttpRequest,
  type UpsertAffiliationOfAuthorHttpRequest,
} from '../rest-clients';
import type { AffiliationQueryOptions, AddAffiliationData, UpsertAffiliationData } from './contracts';

@Injectable({ providedIn: 'root' })
export class AffiliationsHttpAgent {
  private readonly httpClient = inject(AffiliationsHttpClient);

  async getAllAffiliationsOfAuthor(authorId: string, pageNumber: number, pageSize: number, options?: AffiliationQueryOptions): Promise<PagedList<AffiliationDto>> {
    const request: GetAllAffiliationsOfAuthorHttpRequest = { authorId, pageNumber, pageSize, ...options };
    const result = await this.httpClient.getAllAffiliationsOfAuthor(request);

    return PagedList.create<AffiliationDto>(
      result.items.map(dto => ({ ...dto })),
      result.totalCount,
      result.currentPage,
      result.pageSize,
    );
  }

  async getAffiliationOfAuthorByAffiliationId(authorId: string, affiliationId: string, fields?: string): Promise<AffiliationDto | null> {
    try {
      const response = await this.httpClient.getAffiliationOfAuthorByAffiliationId({ authorId, affiliationId, fields });
      return { ...response.data };
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async existsAffiliationOfAuthor(authorId: string, affiliationId: string): Promise<boolean> {
    const response = await this.httpClient.existsAffiliationOfAuthor({ authorId, affiliationId });
    return response.data.exists;
  }

  async checkAffiliationNameUniquenessOfAuthor(authorId: string, institutionName: string, excludeAffiliationId?: string): Promise<boolean> {
    const response = await this.httpClient.checkAffiliationNameUniquenessOfAuthor({ authorId, institutionName, excludeAffiliationId });
    return response.data.isUnique;
  }

  async addAffiliationToAuthor(authorId: string, data: AddAffiliationData): Promise<AffiliationDto> {
    const request: AddAffiliationToAuthorHttpRequest = { authorId, ...data };
    const dto = await this.httpClient.addAffiliationToAuthor(request);
    return { ...dto };
  }

  async upsertAffiliationOfAuthor(authorId: string, affiliationId: string, data: UpsertAffiliationData): Promise<AffiliationDto | null> {
    const request: UpsertAffiliationOfAuthorHttpRequest = { authorId, affiliationId, ...data };
    const dto = await this.httpClient.upsertAffiliationOfAuthor(request);
    return dto ? { ...dto } : null;
  }

  async updatePartialAffiliationOfAuthor(authorId: string, affiliationId: string, operations: JsonPatchOperation[]): Promise<void> {
    await this.httpClient.updatePartialAffiliationOfAuthor({ authorId, affiliationId, operations });
  }

  async removeAffiliationFromAuthor(authorId: string, affiliationId: string): Promise<void> {
    await this.httpClient.removeAffiliationFromAuthor({ authorId, affiliationId });
  }
}

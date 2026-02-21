import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList } from '@eac-arch/infrastructure-http';
import type { AffiliationModel } from '../../application/models';
import { AffiliationsHttpClient } from '../rest-clients';
import type { GetAllAffiliationsOfAuthorHttpRequest } from '../rest-clients';

export interface AffiliationQueryOptions {
  sort?: string;
  search?: string;
  institutionName?: string;
  activeOn?: string;
  fields?: string;
}

@Injectable({ providedIn: 'root' })
export class AffiliationsHttpAgent {
  private readonly httpClient = inject(AffiliationsHttpClient);

  async getAllAffiliationsOfAuthor(authorId: string, pageNumber: number, pageSize: number, options?: AffiliationQueryOptions): Promise<PagedList<AffiliationModel>> {
    const request: GetAllAffiliationsOfAuthorHttpRequest = { authorId, pageNumber, pageSize, ...options };
    const result = await this.httpClient.getAllAffiliationsOfAuthor(request);

    return PagedList.create<AffiliationModel>(
      result.items.map(dto => ({ ...dto })),
      result.totalCount,
      result.currentPage,
      result.pageSize,
    );
  }

  async getAffiliationOfAuthorByAffiliationId(authorId: string, affiliationId: string, fields?: string): Promise<AffiliationModel | null> {
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
}

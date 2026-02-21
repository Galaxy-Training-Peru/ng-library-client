import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList } from '@eac-arch/infrastructure-http';
import type { PublisherModel } from '../../application/models';
import { PublishersHttpClient, type GetAllPublishersHttpRequest } from '../rest-clients';

export interface PublisherQueryOptions {
  sort?: string;
  search?: string;
  fields?: string;
}

@Injectable({ providedIn: 'root' })
export class PublishersHttpAgent {
  private readonly httpClient = inject(PublishersHttpClient);

  async getAllPublishers(pageNumber: number, pageSize: number, options?: PublisherQueryOptions): Promise<PagedList<PublisherModel>> {
    const request: GetAllPublishersHttpRequest = { pageNumber, pageSize, ...options };
    const result = await this.httpClient.getAllPublishers(request);

    return PagedList.create<PublisherModel>(
      result.items.map(dto => ({ ...dto })),
      result.totalCount,
      result.currentPage,
      result.pageSize,
    );
  }

  async getPublisherById(publisherId: string, fields?: string): Promise<PublisherModel | null> {
    try {
      const response = await this.httpClient.getPublisherById({ publisherId, fields });
      return { ...response.data };
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async existsPublisher(publisherId: string): Promise<boolean> {
    const response = await this.httpClient.existsPublisher({ publisherId });
    return response.data.exists;
  }

  async checkPublisherNameUniqueness(name: string, excludePublisherId?: string): Promise<boolean> {
    const response = await this.httpClient.checkPublisherNameUniqueness({ name, excludePublisherId });
    return response.data.isUnique;
  }
}

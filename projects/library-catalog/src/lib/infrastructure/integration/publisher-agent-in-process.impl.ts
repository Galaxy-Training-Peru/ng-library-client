import { inject, Injectable } from '@angular/core';
import { CATALOG_PUBLIC_API, type CatalogPublicApi } from '../../application/public-api';
import type { PublisherAgent } from 'library-integration';
import type {
  GetAllPublishersRequest,
  GetAllPublishersResponse,
  GetPublisherByIdRequest,
  GetPublisherByIdResponse,
  ExistsPublisherRequest,
  ExistsPublisherResponse,
  CheckPublisherNameUniquenessRequest,
  CheckPublisherNameUniquenessResponse,
} from 'library-integration';

@Injectable()
export class PublisherAgentInProcessImpl implements PublisherAgent {
  private readonly api = inject<CatalogPublicApi>(CATALOG_PUBLIC_API);

  getAllPublishers(request: GetAllPublishersRequest): Promise<GetAllPublishersResponse> {
    return this.api.getAllPublishers(request) as Promise<GetAllPublishersResponse>;
  }

  getPublisherById(request: GetPublisherByIdRequest): Promise<GetPublisherByIdResponse> {
    return this.api.getPublisherById(request) as Promise<GetPublisherByIdResponse>;
  }

  existsPublisher(request: ExistsPublisherRequest): Promise<ExistsPublisherResponse> {
    return this.api.existsPublisher(request) as Promise<ExistsPublisherResponse>;
  }

  checkPublisherNameUniqueness(request: CheckPublisherNameUniquenessRequest): Promise<CheckPublisherNameUniquenessResponse> {
    return this.api.checkPublisherNameUniqueness(request) as Promise<CheckPublisherNameUniquenessResponse>;
  }
}

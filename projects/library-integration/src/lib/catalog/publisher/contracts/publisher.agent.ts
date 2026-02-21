import { InjectionToken } from '@angular/core';
import type { GetAllPublishersRequest, GetAllPublishersResponse } from './get-all-publishers';
import type { GetPublisherByIdRequest, GetPublisherByIdResponse } from './get-publisher-by-id';
import type { ExistsPublisherRequest, ExistsPublisherResponse } from './exists-publisher';
import type { CheckPublisherNameUniquenessRequest, CheckPublisherNameUniquenessResponse } from './check-publisher-name-uniqueness';

export interface PublisherAgent {
  getAllPublishers(request: GetAllPublishersRequest): Promise<GetAllPublishersResponse>;
  getPublisherById(request: GetPublisherByIdRequest): Promise<GetPublisherByIdResponse>;
  existsPublisher(request: ExistsPublisherRequest): Promise<ExistsPublisherResponse>;
  checkPublisherNameUniqueness(request: CheckPublisherNameUniquenessRequest): Promise<CheckPublisherNameUniquenessResponse>;
}

export const PUBLISHER_AGENT = new InjectionToken<PublisherAgent>('PublisherAgent');

import type { GetAllPublishersRequest, GetAllPublishersResponse } from './publisher/get-all-publishers';
import type { GetPublisherByIdRequest, GetPublisherByIdResponse } from './publisher/get-publisher-by-id';
import type { ExistsPublisherRequest, ExistsPublisherResponse } from './publisher/exists-publisher';
import type { CheckPublisherNameUniquenessRequest, CheckPublisherNameUniquenessResponse } from './publisher/check-publisher-name-uniqueness';

export interface PublisherPublicApi {
  getAllPublishers(request: GetAllPublishersRequest): Promise<GetAllPublishersResponse>;
  getPublisherById(request: GetPublisherByIdRequest): Promise<GetPublisherByIdResponse>;
  existsPublisher(request: ExistsPublisherRequest): Promise<ExistsPublisherResponse>;
  checkPublisherNameUniqueness(request: CheckPublisherNameUniquenessRequest): Promise<CheckPublisherNameUniquenessResponse>;
}

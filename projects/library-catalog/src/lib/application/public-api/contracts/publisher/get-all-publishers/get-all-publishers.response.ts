import type { PagedList } from '@eac-arch/shared-kernel';
import type { PublisherModel } from '../../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllPublishersResponse extends PagedList<PublisherModel> {}

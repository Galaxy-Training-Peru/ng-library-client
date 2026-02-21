import type { PagedList, QueryResult } from '@eac-arch/shared-kernel';
import type { PublisherModel } from '../../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllPublishersResult extends PagedList<PublisherModel>, QueryResult {}

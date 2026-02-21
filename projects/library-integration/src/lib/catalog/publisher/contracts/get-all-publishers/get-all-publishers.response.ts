import type { PagedList } from '@eac-arch/shared-kernel';
import type { PublisherDto } from '../dtos/publisher.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllPublishersResponse extends PagedList<PublisherDto> {}

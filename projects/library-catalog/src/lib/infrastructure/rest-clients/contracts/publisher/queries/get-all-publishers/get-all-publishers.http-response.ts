import { PagedList } from '@eac-arch/infrastructure-http';
import type { PublisherDto } from '../../../../dtos';

export type GetAllPublishersHttpResponse = PagedList<PublisherDto>;

import type { PagedList } from '@eac-arch/infrastructure-http';
import type { AwardDto } from '../../../../dtos/award.dto';

export type GetAllAwardsOfAuthorHttpResponse = PagedList<AwardDto>;

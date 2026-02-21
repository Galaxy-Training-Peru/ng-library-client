import type { PagedList } from '@eac-arch/infrastructure-http';
import type { AffiliationDto } from '../../../../dtos/affiliation.dto';

export type GetAllAffiliationsOfAuthorHttpResponse = PagedList<AffiliationDto>;

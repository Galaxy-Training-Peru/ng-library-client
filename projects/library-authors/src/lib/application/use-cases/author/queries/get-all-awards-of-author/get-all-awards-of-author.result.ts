import type { PagedList, QueryResult } from '@eac-arch/shared-kernel';
import type { AwardModel } from '../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllAwardsOfAuthorResult extends PagedList<AwardModel>, QueryResult {}

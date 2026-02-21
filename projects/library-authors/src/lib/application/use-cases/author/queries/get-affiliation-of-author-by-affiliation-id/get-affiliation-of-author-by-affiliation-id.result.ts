import type { QueryResult } from '@eac-arch/shared-kernel';
import type { AffiliationModel } from '../../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAffiliationOfAuthorByAffiliationIdResult extends AffiliationModel, QueryResult {}

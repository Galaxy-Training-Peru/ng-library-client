import type { PagedList, QueryResult } from '@eac-arch/shared-kernel';
import type { PaperModel } from '../../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllPapersOfAuthorResult extends PagedList<PaperModel>, QueryResult {}

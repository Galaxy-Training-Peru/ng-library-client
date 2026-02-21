import type { QueryResult } from '@eac-arch/shared-kernel';
import type { PaperModel } from '../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetPaperOfAuthorByPaperIdResult extends PaperModel, QueryResult {}

import type { PagedList } from '@eac-arch/shared-kernel';
import type { PaperModel } from '../../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllPapersOfAuthorResponse extends PagedList<PaperModel> {}

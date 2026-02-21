import type { PagedList } from '@eac-arch/shared-kernel';
import type { LiteraryGenreModel } from '../../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllLiteraryGenresResponse extends PagedList<LiteraryGenreModel> {}

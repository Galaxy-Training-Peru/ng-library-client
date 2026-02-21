import type { PagedList, QueryResult } from '@eac-arch/shared-kernel';
import type { LiteraryGenreModel } from '../../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllLiteraryGenresResult extends PagedList<LiteraryGenreModel>, QueryResult {}

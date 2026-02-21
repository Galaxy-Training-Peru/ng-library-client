import type { PagedList } from '@eac-arch/shared-kernel';
import type { AuthorModel } from '../../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllAuthorsResponse extends PagedList<AuthorModel> {}

import type { PagedList } from '@eac-arch/shared-kernel';
import type { AuthorDto } from '../dtos/author.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllAuthorsResponse extends PagedList<AuthorDto> {}

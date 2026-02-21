import type { PagedList } from '@eac-arch/shared-kernel';
import type { LiteraryGenreDto } from '../dtos/literary-genre.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetAllLiteraryGenresResponse extends PagedList<LiteraryGenreDto> {}

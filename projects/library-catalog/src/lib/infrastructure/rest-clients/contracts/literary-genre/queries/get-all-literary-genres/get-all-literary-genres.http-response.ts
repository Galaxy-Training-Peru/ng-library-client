import { PagedList } from '@eac-arch/infrastructure-http';
import type { LiteraryGenreDto } from '../../../../dtos';

export type GetAllLiteraryGenresHttpResponse = PagedList<LiteraryGenreDto>;

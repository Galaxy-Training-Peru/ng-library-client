import type { PagedList } from '@eac-arch/infrastructure-http';
import type { AuthorDto } from '../../../../dtos/author.dto';

export type GetAllAuthorsHttpResponse = PagedList<AuthorDto>;

import type { PagedList } from '@eac-arch/infrastructure-http';
import type { PaperDto } from '../../../../dtos/paper.dto';

export type GetAllPapersOfAuthorHttpResponse = PagedList<PaperDto>;

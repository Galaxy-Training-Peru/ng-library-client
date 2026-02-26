import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
} from '@eac-arch/shared-kernel';
import { HttpQueryService } from '@eac-arch/infrastructure-persistence';
import type { PaperQueryService } from '../../../application/contracts';
import type { PaperModel } from '../../../application/models';
import { PapersHttpAgent } from '../../http-agents';
import type { PaperQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class PaperQueryServiceImpl
  extends HttpQueryService<PaperModel, PaperQueryOptions>
  implements PaperQueryService {

  private readonly agent = inject(PapersHttpAgent);

  async getAllPapersOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<PaperModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<PaperModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllPapersOfAuthor(authorId, pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getPaperOfAuthorByPaperId(authorId: string, paperId: string, fields?: string[]): Promise<PaperModel | null> {
    return this.agent.getPaperOfAuthorByPaperId(authorId, paperId, fields?.join(','));
  }

  existsPaperOfAuthor(authorId: string, paperId: string): Promise<boolean> {
    return this.agent.existsPaperOfAuthor(authorId, paperId);
  }

  checkPaperTitleUniquenessOfAuthor(authorId: string, title: string, excludePaperId?: string): Promise<boolean> {
    return this.agent.checkPaperTitleUniquenessOfAuthor(authorId, title, excludePaperId);
  }
}

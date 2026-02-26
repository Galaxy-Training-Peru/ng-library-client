import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
} from '@eac-arch/shared-kernel';
import { HttpQueryService } from '@eac-arch/infrastructure-persistence';
import type { AwardQueryService } from '../../../application/contracts';
import type { AwardModel } from '../../../application/models';
import { AwardsHttpAgent } from '../../http-agents';
import type { AwardQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class AwardQueryServiceImpl
  extends HttpQueryService<AwardModel, AwardQueryOptions>
  implements AwardQueryService {

  private readonly agent = inject(AwardsHttpAgent);

  // Sub-resource: no doGetAll/doGetById override — parent ID is required.
  // Uses inherited buildOptions() and toPagedList() helpers.

  async getAllAwardsOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AwardModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AwardModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllAwardsOfAuthor(authorId, pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getAwardOfAuthorByAwardId(authorId: string, awardId: string, fields?: string[]): Promise<AwardModel | null> {
    return this.agent.getAwardOfAuthorByAwardId(authorId, awardId, fields?.join(','));
  }

  existsAwardOfAuthor(authorId: string, awardId: string): Promise<boolean> {
    return this.agent.existsAwardOfAuthor(authorId, awardId);
  }

  checkAwardTitleUniquenessOfAuthor(authorId: string, title: string, excludeAwardId?: string): Promise<boolean> {
    return this.agent.checkAwardTitleUniquenessOfAuthor(authorId, title, excludeAwardId);
  }
}

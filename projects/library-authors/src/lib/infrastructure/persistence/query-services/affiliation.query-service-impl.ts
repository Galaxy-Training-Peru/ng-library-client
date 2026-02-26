import { inject, Injectable } from '@angular/core';
import {
  type PagedList,
  type Specification,
  type SortField,
} from '@eac-arch/shared-kernel';
import { HttpQueryService } from '@eac-arch/infrastructure-persistence';
import type { AffiliationQueryService } from '../../../application/contracts';
import type { AffiliationModel } from '../../../application/models';
import { AffiliationsHttpAgent } from '../../http-agents';
import type { AffiliationQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class AffiliationQueryServiceImpl
  extends HttpQueryService<AffiliationModel, AffiliationQueryOptions>
  implements AffiliationQueryService {

  private readonly agent = inject(AffiliationsHttpAgent);

  async getAllAffiliationsOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AffiliationModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AffiliationModel>> {
    const options = this.buildOptions(spec, sortFields, fields);
    const result = await this.agent.getAllAffiliationsOfAuthor(authorId, pageNumber, pageSize, options);
    return this.toPagedList(result);
  }

  getAffiliationOfAuthorByAffiliationId(authorId: string, affiliationId: string, fields?: string[]): Promise<AffiliationModel | null> {
    return this.agent.getAffiliationOfAuthorByAffiliationId(authorId, affiliationId, fields?.join(','));
  }

  existsAffiliationOfAuthor(authorId: string, affiliationId: string): Promise<boolean> {
    return this.agent.existsAffiliationOfAuthor(authorId, affiliationId);
  }

  checkAffiliationNameUniquenessOfAuthor(authorId: string, institutionName: string, excludeAffiliationId?: string): Promise<boolean> {
    return this.agent.checkAffiliationNameUniquenessOfAuthor(authorId, institutionName, excludeAffiliationId);
  }
}

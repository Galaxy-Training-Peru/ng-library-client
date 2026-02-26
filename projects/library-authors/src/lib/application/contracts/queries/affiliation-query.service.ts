import { InjectionToken } from '@angular/core';
import type { PagedList, Specification, SortField } from '@eac-arch/shared-kernel';
import type { AffiliationModel } from '../../models';

export interface AffiliationQueryService {
  getAllAffiliationsOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AffiliationModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AffiliationModel>>;

  getAffiliationOfAuthorByAffiliationId(authorId: string, affiliationId: string, fields?: string[]): Promise<AffiliationModel | null>;

  existsAffiliationOfAuthor(authorId: string, affiliationId: string): Promise<boolean>;

  checkAffiliationNameUniquenessOfAuthor(authorId: string, institutionName: string, excludeAffiliationId?: string): Promise<boolean>;
}

export const AFFILIATION_QUERY_SERVICE = new InjectionToken<AffiliationQueryService>('AffiliationQueryService');

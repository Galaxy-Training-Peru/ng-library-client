import { InjectionToken } from '@angular/core';
import type { PagedList, Specification, SortField } from '@eac-arch/shared-kernel';
import type { AwardModel } from '../../../models';

export interface AwardQueryService {
  getAllAwardsOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<AwardModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<AwardModel>>;

  getAwardOfAuthorByAwardId(authorId: string, awardId: string, fields?: string[]): Promise<AwardModel | null>;

  existsAwardOfAuthor(authorId: string, awardId: string): Promise<boolean>;

  checkAwardTitleUniquenessOfAuthor(authorId: string, title: string, excludeAwardId?: string): Promise<boolean>;
}

export const AWARD_QUERY_SERVICE = new InjectionToken<AwardQueryService>('AwardQueryService');

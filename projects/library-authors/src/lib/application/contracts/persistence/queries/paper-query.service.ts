import { InjectionToken } from '@angular/core';
import type { PagedList, Specification, SortField } from '@eac-arch/shared-kernel';
import type { PaperModel } from '../../../models';

export interface PaperQueryService {
  getAllPapersOfAuthor(
    authorId: string,
    pageNumber: number,
    pageSize: number,
    spec?: Specification<PaperModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<PaperModel>>;

  getPaperOfAuthorByPaperId(authorId: string, paperId: string, fields?: string[]): Promise<PaperModel | null>;

  existsPaperOfAuthor(authorId: string, paperId: string): Promise<boolean>;

  checkPaperTitleUniquenessOfAuthor(authorId: string, title: string, excludePaperId?: string): Promise<boolean>;
}

export const PAPER_QUERY_SERVICE = new InjectionToken<PaperQueryService>('PaperQueryService');

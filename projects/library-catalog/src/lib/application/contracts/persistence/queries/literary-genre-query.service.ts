import { InjectionToken } from '@angular/core';
import type { PagedList, QueryService, Specification, SortField } from '@eac-arch/shared-kernel';
import type { LiteraryGenreModel } from '../../../models';

export interface LiteraryGenreQueryService extends QueryService<LiteraryGenreModel> {
  getAllLiteraryGenres(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<LiteraryGenreModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<LiteraryGenreModel>>;

  getLiteraryGenreById(literaryGenreId: string, fields?: string[]): Promise<LiteraryGenreModel | null>;

  existsLiteraryGenre(literaryGenreId: string): Promise<boolean>;

  checkLiteraryGenreNameUniqueness(name: string, excludeLiteraryGenreId?: string): Promise<boolean>;
}

export const LITERARY_GENRE_QUERY_SERVICE = new InjectionToken<LiteraryGenreQueryService>('LiteraryGenreQueryService');

import { inject, Injectable } from '@angular/core';
import { type PagedList, type Specification, type SortField } from '@eac-arch/shared-kernel';
import { HttpQueryService } from '@eac-arch/infrastructure-persistence';
import type { LiteraryGenreQueryService } from '../../../application/contracts';
import type { LiteraryGenreModel } from '../../../application/models';
import { LiteraryGenresHttpAgent } from '../../http-agents';
import type { LiteraryGenreQueryOptions } from '../../http-agents';

@Injectable({ providedIn: 'root' })
export class LiteraryGenreQueryServiceImpl
  extends HttpQueryService<LiteraryGenreModel, LiteraryGenreQueryOptions>
  implements LiteraryGenreQueryService {

  private readonly httpAgent = inject(LiteraryGenresHttpAgent);

  // -- HttpQueryService delegates --

  protected override doGetAll(pageNumber: number, pageSize: number, options?: LiteraryGenreQueryOptions): Promise<PagedList<LiteraryGenreModel>> {
    return this.httpAgent.getAllLiteraryGenres(pageNumber, pageSize, options);
  }

  protected override doGetById(id: string): Promise<LiteraryGenreModel | null> {
    return this.httpAgent.getLiteraryGenreById(id);
  }

  // -- LiteraryGenreQueryService-specific methods --

  getAllLiteraryGenres(
    pageNumber: number,
    pageSize: number,
    spec?: Specification<LiteraryGenreModel>,
    sortFields?: SortField[],
    fields?: string[],
  ): Promise<PagedList<LiteraryGenreModel>> {
    return this.getPagedList(pageNumber, pageSize, spec, sortFields, fields);
  }

  getLiteraryGenreById(literaryGenreId: string, fields?: string[]): Promise<LiteraryGenreModel | null> {
    return this.httpAgent.getLiteraryGenreById(literaryGenreId, fields?.join(','));
  }

  existsLiteraryGenre(literaryGenreId: string): Promise<boolean> {
    return this.httpAgent.existsLiteraryGenre(literaryGenreId);
  }

  checkLiteraryGenreNameUniqueness(name: string, excludeLiteraryGenreId?: string): Promise<boolean> {
    return this.httpAgent.checkLiteraryGenreNameUniqueness(name, excludeLiteraryGenreId);
  }
}

import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import type { SortField } from '@eac-arch/shared-kernel';
import { LITERARY_GENRE_AGENT } from 'library-integration';
import type { LiteraryGenreDto } from 'library-integration';
import { AUTHORS_PUBLIC_API, type GetAllAuthorsRequest } from '../../../application/public-api';
import type { AuthorModel } from '../../../application/models';
import { ListQueryParamsSyncer } from '@eac-arch/infrastructure-state';

@Injectable()
export class AuthorListViewModel {

  private readonly publicApi = inject(AUTHORS_PUBLIC_API);
  private readonly literaryGenreAgent = inject(LITERARY_GENRE_AGENT);

  private readonly url = new ListQueryParamsSyncer({
    search:          { type: 'string' as const, debounce: 350 },
    // URL is 1-based, signal is 0-based — default must be in URL space (1)
    pageIndex:       { type: 'number' as const, default: 1, toSignal: (v: number) => v - 1, fromSignal: (v: number) => v + 1 },
    pageSize:        { type: 'number' as const, default: 10 },
    sort:            { type: 'sort'   as const },
    literaryGenreId: { type: 'string' as const },
  });

  // Expose URL-bound signals directly — seeded from URL, auto-synced back
  readonly searchText            = this.url.params.search;
  readonly currentPage           = this.url.params.pageIndex;
  readonly pageSize              = this.url.params.pageSize;
  readonly sortFields            = this.url.params.sort as unknown as ReturnType<typeof signal<SortField[]>>;
  readonly selectedLiteraryGenreId = this.url.params.literaryGenreId;

  // Sort visual helpers for matSortActive / matSortDirection bindings
  readonly activeSortField     = computed(() => (this.url.params.sort()[0] as SortField | undefined)?.field ?? '');
  readonly activeSortDirection = computed(() => (this.url.params.sort()[0] as SortField | undefined)?.direction ?? '');

  readonly authors        = signal<readonly AuthorModel[]>([]);
  readonly totalCount     = signal(0);
  readonly isLoading      = signal(false);
  readonly literaryGenres = signal<readonly LiteraryGenreDto[]>([]);

  private readonly queryParams = computed(() => ({
    pageIndex:       this.currentPage() ?? 0,
    pageSize:        this.pageSize()    ?? 10,
    sortFields:      this.url.params.sort() as SortField[],
    searchText:      this.url.debounced.search() ?? '',
    literaryGenreId: this.selectedLiteraryGenreId() ?? undefined,
  }));

  constructor() {
    this.loadLiteraryGenres();
    effect(() => {
      const params = this.queryParams();
      untracked(() => this.doLoadAuthors(params));
    });
  }

  private async loadLiteraryGenres(): Promise<void> {
    try {
      const response = await this.literaryGenreAgent.getAllLiteraryGenres({ pageNumber: 1, pageSize: 100 });
      this.literaryGenres.set(response.items);
    } catch {
      this.literaryGenres.set([]);
    }
  }

  private async doLoadAuthors(params: ReturnType<typeof this.queryParams>): Promise<void> {
    this.isLoading.set(true);
    try {
      const request: GetAllAuthorsRequest = {
        pageNumber: params.pageIndex + 1,
        pageSize:   params.pageSize,
        search:     params.searchText || undefined,
        literaryGenreId: params.literaryGenreId ?? undefined,
        sortFields: params.sortFields.length ? params.sortFields : undefined,
      };
      const response = await this.publicApi.getAllAuthors(request);
      this.authors.set(response.items);
      this.totalCount.set(response.totalCount);
    } catch {
      this.authors.set([]);
      this.totalCount.set(0);
    } finally {
      this.isLoading.set(false);
    }
  }
}

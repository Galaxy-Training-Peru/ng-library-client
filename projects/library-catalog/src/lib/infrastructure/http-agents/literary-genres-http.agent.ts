import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PagedList } from '@eac-arch/infrastructure-http';
import type { LiteraryGenreModel } from '../../application/models';
import { LiteraryGenresHttpClient, type GetAllLiteraryGenresHttpRequest } from '../rest-clients';

export interface LiteraryGenreQueryOptions {
  sort?: string;
  search?: string;
  fields?: string;
}

@Injectable({ providedIn: 'root' })
export class LiteraryGenresHttpAgent {
  private readonly httpClient = inject(LiteraryGenresHttpClient);

  async getAllLiteraryGenres(pageNumber: number, pageSize: number, options?: LiteraryGenreQueryOptions): Promise<PagedList<LiteraryGenreModel>> {
    const request: GetAllLiteraryGenresHttpRequest = { pageNumber, pageSize, ...options };
    const result = await this.httpClient.getAllLiteraryGenres(request);

    return PagedList.create<LiteraryGenreModel>(
      result.items.map(dto => ({ ...dto })),
      result.totalCount,
      result.currentPage,
      result.pageSize,
    );
  }

  async getLiteraryGenreById(literaryGenreId: string, fields?: string): Promise<LiteraryGenreModel | null> {
    try {
      const response = await this.httpClient.getLiteraryGenreById({ literaryGenreId, fields });
      return { ...response.data };
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async existsLiteraryGenre(literaryGenreId: string): Promise<boolean> {
    const response = await this.httpClient.existsLiteraryGenre({ literaryGenreId });
    return response.data.exists;
  }

  async checkLiteraryGenreNameUniqueness(name: string, excludeLiteraryGenreId?: string): Promise<boolean> {
    const response = await this.httpClient.checkLiteraryGenreNameUniqueness({ name, excludeLiteraryGenreId });
    return response.data.isUnique;
  }
}

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AUTHORS_PUBLIC_API } from '../../../application/public-api';
import type { AuthorModel, AwardModel, PaperModel, AffiliationModel } from '../../../application/models';

export interface AuthorDetailResolvedData {
  author:       AuthorModel | null;
  awards:       readonly AwardModel[];
  papers:       readonly PaperModel[];
  affiliations: readonly AffiliationModel[];
}

export const authorDetailResolver: ResolveFn<AuthorDetailResolvedData> = async (route) => {
  const api      = inject(AUTHORS_PUBLIC_API);
  const authorId = route.paramMap.get('authorId')!;

  try {
    const [author, awardsPage, papersPage, affiliationsPage] = await Promise.all([
      api.getAuthorById({ authorId }),
      api.getAllAwardsOfAuthor({ authorId, pageNumber: 1, pageSize: 100 }),
      api.getAllPapersOfAuthor({ authorId, pageNumber: 1, pageSize: 100 }),
      api.getAllAffiliationsOfAuthor({ authorId, pageNumber: 1, pageSize: 100 }),
    ]);
    return {
      author,
      awards:       awardsPage.items,
      papers:       papersPage.items,
      affiliations: affiliationsPage.items,
    };
  } catch {
    return { author: null, awards: [], papers: [], affiliations: [] };
  }
};

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LITERARY_GENRE_AGENT } from 'library-integration';
import type { LiteraryGenreDto } from 'library-integration';
import { AUTHORS_PUBLIC_API } from '../../../application/public-api';
import type { GetAuthorByIdResponse } from '../../../application/public-api/contracts/author';

export interface AuthorEditResolvedData {
  author: GetAuthorByIdResponse | null;
  genres: readonly LiteraryGenreDto[];
}

export const authorEditResolver: ResolveFn<AuthorEditResolvedData> = async (route) => {
  const api               = inject(AUTHORS_PUBLIC_API);
  const literaryGenreAgent = inject(LITERARY_GENRE_AGENT);
  const authorId          = route.paramMap.get('authorId')!;

  try {
    const [author, genresPage] = await Promise.all([
      api.getAuthorById({ authorId }),
      literaryGenreAgent.getAllLiteraryGenres({ pageNumber: 1, pageSize: 100 }),
    ]);
    return { author, genres: genresPage.items };
  } catch {
    return { author: null, genres: [] };
  }
};

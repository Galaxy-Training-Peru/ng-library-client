import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LITERARY_GENRE_AGENT } from 'library-integration';
import type { AuthorEditResolvedData } from './author-edit.resolver';

export const authorNewResolver: ResolveFn<AuthorEditResolvedData> = async () => {
  const literaryGenreAgent = inject(LITERARY_GENRE_AGENT);

  try {
    const genresPage = await literaryGenreAgent.getAllLiteraryGenres({ pageNumber: 1, pageSize: 100 });
    return { author: null, genres: genresPage.items };
  } catch {
    return { author: null, genres: [] };
  }
};

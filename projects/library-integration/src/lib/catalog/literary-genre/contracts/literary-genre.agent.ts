import { InjectionToken } from '@angular/core';
import type { GetAllLiteraryGenresRequest, GetAllLiteraryGenresResponse } from './get-all-literary-genres';
import type { GetLiteraryGenreByIdRequest, GetLiteraryGenreByIdResponse } from './get-literary-genre-by-id';
import type { ExistsLiteraryGenreRequest, ExistsLiteraryGenreResponse } from './exists-literary-genre';
import type { CheckLiteraryGenreNameUniquenessRequest, CheckLiteraryGenreNameUniquenessResponse } from './check-literary-genre-name-uniqueness';

export interface LiteraryGenreAgent {
  getAllLiteraryGenres(request: GetAllLiteraryGenresRequest): Promise<GetAllLiteraryGenresResponse>;
  getLiteraryGenreById(request: GetLiteraryGenreByIdRequest): Promise<GetLiteraryGenreByIdResponse>;
  existsLiteraryGenre(request: ExistsLiteraryGenreRequest): Promise<ExistsLiteraryGenreResponse>;
  checkLiteraryGenreNameUniqueness(request: CheckLiteraryGenreNameUniquenessRequest): Promise<CheckLiteraryGenreNameUniquenessResponse>;
}

export const LITERARY_GENRE_AGENT = new InjectionToken<LiteraryGenreAgent>('LiteraryGenreAgent');

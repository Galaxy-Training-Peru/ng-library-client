import type { GetAllLiteraryGenresRequest, GetAllLiteraryGenresResponse } from './literary-genre/get-all-literary-genres';
import type { GetLiteraryGenreByIdRequest, GetLiteraryGenreByIdResponse } from './literary-genre/get-literary-genre-by-id';
import type { ExistsLiteraryGenreRequest, ExistsLiteraryGenreResponse } from './literary-genre/exists-literary-genre';
import type { CheckLiteraryGenreNameUniquenessRequest, CheckLiteraryGenreNameUniquenessResponse } from './literary-genre/check-literary-genre-name-uniqueness';

export interface LiteraryGenrePublicApi {
  getAllLiteraryGenres(request: GetAllLiteraryGenresRequest): Promise<GetAllLiteraryGenresResponse>;
  getLiteraryGenreById(request: GetLiteraryGenreByIdRequest): Promise<GetLiteraryGenreByIdResponse>;
  existsLiteraryGenre(request: ExistsLiteraryGenreRequest): Promise<ExistsLiteraryGenreResponse>;
  checkLiteraryGenreNameUniqueness(request: CheckLiteraryGenreNameUniquenessRequest): Promise<CheckLiteraryGenreNameUniquenessResponse>;
}

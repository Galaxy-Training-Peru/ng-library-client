import { inject, Injectable } from '@angular/core';
import { CATALOG_PUBLIC_API, type CatalogPublicApi } from '../../application/public-api';
import type { LiteraryGenreAgent } from 'library-integration';
import type {
  GetAllLiteraryGenresRequest,
  GetAllLiteraryGenresResponse,
  GetLiteraryGenreByIdRequest,
  GetLiteraryGenreByIdResponse,
  ExistsLiteraryGenreRequest,
  ExistsLiteraryGenreResponse,
  CheckLiteraryGenreNameUniquenessRequest,
  CheckLiteraryGenreNameUniquenessResponse,
} from 'library-integration';

@Injectable()
export class LiteraryGenreAgentInProcessImpl implements LiteraryGenreAgent {
  private readonly api = inject<CatalogPublicApi>(CATALOG_PUBLIC_API);

  getAllLiteraryGenres(request: GetAllLiteraryGenresRequest): Promise<GetAllLiteraryGenresResponse> {
    return this.api.getAllLiteraryGenres(request) as Promise<GetAllLiteraryGenresResponse>;
  }

  getLiteraryGenreById(request: GetLiteraryGenreByIdRequest): Promise<GetLiteraryGenreByIdResponse> {
    return this.api.getLiteraryGenreById(request) as Promise<GetLiteraryGenreByIdResponse>;
  }

  existsLiteraryGenre(request: ExistsLiteraryGenreRequest): Promise<ExistsLiteraryGenreResponse> {
    return this.api.existsLiteraryGenre(request) as Promise<ExistsLiteraryGenreResponse>;
  }

  checkLiteraryGenreNameUniqueness(request: CheckLiteraryGenreNameUniquenessRequest): Promise<CheckLiteraryGenreNameUniquenessResponse> {
    return this.api.checkLiteraryGenreNameUniqueness(request) as Promise<CheckLiteraryGenreNameUniquenessResponse>;
  }
}

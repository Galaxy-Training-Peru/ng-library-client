import { inject, Injectable } from '@angular/core';

// Contracts
import type { CatalogPublicApi } from './contracts';
import type {
  GetAllLiteraryGenresRequest, GetAllLiteraryGenresResponse,
  GetLiteraryGenreByIdRequest, GetLiteraryGenreByIdResponse,
  ExistsLiteraryGenreRequest, ExistsLiteraryGenreResponse,
  CheckLiteraryGenreNameUniquenessRequest, CheckLiteraryGenreNameUniquenessResponse,
} from './contracts/literary-genre';
import type {
  GetAllPublishersRequest, GetAllPublishersResponse,
  GetPublisherByIdRequest, GetPublisherByIdResponse,
  ExistsPublisherRequest, ExistsPublisherResponse,
  CheckPublisherNameUniquenessRequest, CheckPublisherNameUniquenessResponse,
} from './contracts/publisher';

// Use cases
import {
  GetAllLiteraryGenresUseCase,
  GetLiteraryGenreByIdUseCase,
  ExistsLiteraryGenreUseCase,
  CheckLiteraryGenreNameUniquenessUseCase,
  GetAllPublishersUseCase,
  GetPublisherByIdUseCase,
  ExistsPublisherUseCase,
  CheckPublisherNameUniquenessUseCase,
} from '../use-cases';

@Injectable()
export class CatalogPublicApiImpl implements CatalogPublicApi {

  private readonly getAllLiteraryGenresUseCase = inject(GetAllLiteraryGenresUseCase);
  private readonly getLiteraryGenreByIdUseCase = inject(GetLiteraryGenreByIdUseCase);
  private readonly existsLiteraryGenreUseCase = inject(ExistsLiteraryGenreUseCase);
  private readonly checkLiteraryGenreNameUniquenessUseCase = inject(CheckLiteraryGenreNameUniquenessUseCase);
  private readonly getAllPublishersUseCase = inject(GetAllPublishersUseCase);
  private readonly getPublisherByIdUseCase = inject(GetPublisherByIdUseCase);
  private readonly existsPublisherUseCase = inject(ExistsPublisherUseCase);
  private readonly checkPublisherNameUniquenessUseCase = inject(CheckPublisherNameUniquenessUseCase);

  // LiteraryGenre
  getAllLiteraryGenres(request: GetAllLiteraryGenresRequest): Promise<GetAllLiteraryGenresResponse> {
    return this.getAllLiteraryGenresUseCase.execute({
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      search: request.search,
      sortFields: request.sortFields,
      fields: request.fields,
    });
  }

  getLiteraryGenreById(request: GetLiteraryGenreByIdRequest): Promise<GetLiteraryGenreByIdResponse> {
    return this.getLiteraryGenreByIdUseCase.execute({
      literaryGenreId: request.literaryGenreId,
      fields: request.fields,
    });
  }

  existsLiteraryGenre(request: ExistsLiteraryGenreRequest): Promise<ExistsLiteraryGenreResponse> {
    return this.existsLiteraryGenreUseCase.execute({
      literaryGenreId: request.literaryGenreId,
    });
  }

  checkLiteraryGenreNameUniqueness(request: CheckLiteraryGenreNameUniquenessRequest): Promise<CheckLiteraryGenreNameUniquenessResponse> {
    return this.checkLiteraryGenreNameUniquenessUseCase.execute({
      name: request.name,
      excludeLiteraryGenreId: request.excludeLiteraryGenreId,
    });
  }

  // Publisher
  getAllPublishers(request: GetAllPublishersRequest): Promise<GetAllPublishersResponse> {
    return this.getAllPublishersUseCase.execute({
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      search: request.search,
      sortFields: request.sortFields,
      fields: request.fields,
    });
  }

  getPublisherById(request: GetPublisherByIdRequest): Promise<GetPublisherByIdResponse> {
    return this.getPublisherByIdUseCase.execute({
      publisherId: request.publisherId,
      fields: request.fields,
    });
  }

  existsPublisher(request: ExistsPublisherRequest): Promise<ExistsPublisherResponse> {
    return this.existsPublisherUseCase.execute({
      publisherId: request.publisherId,
    });
  }

  checkPublisherNameUniqueness(request: CheckPublisherNameUniquenessRequest): Promise<CheckPublisherNameUniquenessResponse> {
    return this.checkPublisherNameUniquenessUseCase.execute({
      name: request.name,
      excludePublisherId: request.excludePublisherId,
    });
  }
}

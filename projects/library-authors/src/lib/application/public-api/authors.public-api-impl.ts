import { inject, Injectable } from '@angular/core';

// Contracts
import type { AuthorsPublicApi } from './contracts';
import type {
  GetAllAuthorsRequest, GetAllAuthorsResponse,
  GetAuthorByIdRequest, GetAuthorByIdResponse,
  ExistsAuthorRequest, ExistsAuthorResponse,
  CheckAuthorNameUniquenessRequest, CheckAuthorNameUniquenessResponse,
} from './contracts/author';
import type {
  GetAllPapersOfAuthorRequest, GetAllPapersOfAuthorResponse,
  GetPaperOfAuthorByPaperIdRequest, GetPaperOfAuthorByPaperIdResponse,
  ExistsPaperOfAuthorRequest, ExistsPaperOfAuthorResponse,
  CheckPaperTitleUniquenessOfAuthorRequest, CheckPaperTitleUniquenessOfAuthorResponse,
} from './contracts/paper';
import type {
  GetAllAwardsOfAuthorRequest, GetAllAwardsOfAuthorResponse,
  GetAwardOfAuthorByAwardIdRequest, GetAwardOfAuthorByAwardIdResponse,
  ExistsAwardOfAuthorRequest, ExistsAwardOfAuthorResponse,
  CheckAwardTitleUniquenessOfAuthorRequest, CheckAwardTitleUniquenessOfAuthorResponse,
} from './contracts/award';
import type {
  GetAllAffiliationsOfAuthorRequest, GetAllAffiliationsOfAuthorResponse,
  GetAffiliationOfAuthorByAffiliationIdRequest, GetAffiliationOfAuthorByAffiliationIdResponse,
  ExistsAffiliationOfAuthorRequest, ExistsAffiliationOfAuthorResponse,
  CheckAffiliationNameUniquenessOfAuthorRequest, CheckAffiliationNameUniquenessOfAuthorResponse,
} from './contracts/affiliation';

// Use cases
import {
  GetAllAuthorsUseCase,
  GetAuthorByIdUseCase,
  ExistsAuthorUseCase,
  CheckAuthorNameUniquenessUseCase,
  GetAllPapersOfAuthorUseCase,
  GetPaperOfAuthorByPaperIdUseCase,
  ExistsPaperOfAuthorUseCase,
  CheckPaperTitleUniquenessOfAuthorUseCase,
  GetAllAwardsOfAuthorUseCase,
  GetAwardOfAuthorByAwardIdUseCase,
  ExistsAwardOfAuthorUseCase,
  CheckAwardTitleUniquenessOfAuthorUseCase,
  GetAllAffiliationsOfAuthorUseCase,
  GetAffiliationOfAuthorByAffiliationIdUseCase,
  ExistsAffiliationOfAuthorUseCase,
  CheckAffiliationNameUniquenessOfAuthorUseCase,
} from '../use-cases';

@Injectable()
export class AuthorsPublicApiImpl implements AuthorsPublicApi {

  // Author
  private readonly getAllAuthorsUseCase = inject(GetAllAuthorsUseCase);
  private readonly getAuthorByIdUseCase = inject(GetAuthorByIdUseCase);
  private readonly existsAuthorUseCase = inject(ExistsAuthorUseCase);
  private readonly checkAuthorNameUniquenessUseCase = inject(CheckAuthorNameUniquenessUseCase);

  // Paper
  private readonly getAllPapersOfAuthorUseCase = inject(GetAllPapersOfAuthorUseCase);
  private readonly getPaperOfAuthorByPaperIdUseCase = inject(GetPaperOfAuthorByPaperIdUseCase);
  private readonly existsPaperOfAuthorUseCase = inject(ExistsPaperOfAuthorUseCase);
  private readonly checkPaperTitleUniquenessOfAuthorUseCase = inject(CheckPaperTitleUniquenessOfAuthorUseCase);

  // Award
  private readonly getAllAwardsOfAuthorUseCase = inject(GetAllAwardsOfAuthorUseCase);
  private readonly getAwardOfAuthorByAwardIdUseCase = inject(GetAwardOfAuthorByAwardIdUseCase);
  private readonly existsAwardOfAuthorUseCase = inject(ExistsAwardOfAuthorUseCase);
  private readonly checkAwardTitleUniquenessOfAuthorUseCase = inject(CheckAwardTitleUniquenessOfAuthorUseCase);

  // Affiliation
  private readonly getAllAffiliationsOfAuthorUseCase = inject(GetAllAffiliationsOfAuthorUseCase);
  private readonly getAffiliationOfAuthorByAffiliationIdUseCase = inject(GetAffiliationOfAuthorByAffiliationIdUseCase);
  private readonly existsAffiliationOfAuthorUseCase = inject(ExistsAffiliationOfAuthorUseCase);
  private readonly checkAffiliationNameUniquenessOfAuthorUseCase = inject(CheckAffiliationNameUniquenessOfAuthorUseCase);

  // #region Author Operations

  async getAllAuthors(request: GetAllAuthorsRequest): Promise<GetAllAuthorsResponse> {
    return this.getAllAuthorsUseCase.execute(request);
  }

  async getAuthorById(request: GetAuthorByIdRequest): Promise<GetAuthorByIdResponse> {
    return this.getAuthorByIdUseCase.execute(request);
  }

  async existsAuthor(request: ExistsAuthorRequest): Promise<ExistsAuthorResponse> {
    return this.existsAuthorUseCase.execute(request);
  }

  async checkAuthorNameUniqueness(request: CheckAuthorNameUniquenessRequest): Promise<CheckAuthorNameUniquenessResponse> {
    return this.checkAuthorNameUniquenessUseCase.execute(request);
  }

  // #endregion

  // #region Paper Operations

  async getAllPapersOfAuthor(request: GetAllPapersOfAuthorRequest): Promise<GetAllPapersOfAuthorResponse> {
    return this.getAllPapersOfAuthorUseCase.execute(request);
  }

  async getPaperOfAuthorByPaperId(request: GetPaperOfAuthorByPaperIdRequest): Promise<GetPaperOfAuthorByPaperIdResponse> {
    return this.getPaperOfAuthorByPaperIdUseCase.execute(request);
  }

  async existsPaperOfAuthor(request: ExistsPaperOfAuthorRequest): Promise<ExistsPaperOfAuthorResponse> {
    return this.existsPaperOfAuthorUseCase.execute(request);
  }

  async checkPaperTitleUniquenessOfAuthor(request: CheckPaperTitleUniquenessOfAuthorRequest): Promise<CheckPaperTitleUniquenessOfAuthorResponse> {
    return this.checkPaperTitleUniquenessOfAuthorUseCase.execute(request);
  }

  // #endregion

  // #region Award Operations

  async getAllAwardsOfAuthor(request: GetAllAwardsOfAuthorRequest): Promise<GetAllAwardsOfAuthorResponse> {
    return this.getAllAwardsOfAuthorUseCase.execute(request);
  }

  async getAwardOfAuthorByAwardId(request: GetAwardOfAuthorByAwardIdRequest): Promise<GetAwardOfAuthorByAwardIdResponse> {
    return this.getAwardOfAuthorByAwardIdUseCase.execute(request);
  }

  async existsAwardOfAuthor(request: ExistsAwardOfAuthorRequest): Promise<ExistsAwardOfAuthorResponse> {
    return this.existsAwardOfAuthorUseCase.execute(request);
  }

  async checkAwardTitleUniquenessOfAuthor(request: CheckAwardTitleUniquenessOfAuthorRequest): Promise<CheckAwardTitleUniquenessOfAuthorResponse> {
    return this.checkAwardTitleUniquenessOfAuthorUseCase.execute(request);
  }

  // #endregion

  // #region Affiliation Operations

  async getAllAffiliationsOfAuthor(request: GetAllAffiliationsOfAuthorRequest): Promise<GetAllAffiliationsOfAuthorResponse> {
    return this.getAllAffiliationsOfAuthorUseCase.execute(request);
  }

  async getAffiliationOfAuthorByAffiliationId(request: GetAffiliationOfAuthorByAffiliationIdRequest): Promise<GetAffiliationOfAuthorByAffiliationIdResponse> {
    return this.getAffiliationOfAuthorByAffiliationIdUseCase.execute(request);
  }

  async existsAffiliationOfAuthor(request: ExistsAffiliationOfAuthorRequest): Promise<ExistsAffiliationOfAuthorResponse> {
    return this.existsAffiliationOfAuthorUseCase.execute(request);
  }

  async checkAffiliationNameUniquenessOfAuthor(request: CheckAffiliationNameUniquenessOfAuthorRequest): Promise<CheckAffiliationNameUniquenessOfAuthorResponse> {
    return this.checkAffiliationNameUniquenessOfAuthorUseCase.execute(request);
  }

  // #endregion
}

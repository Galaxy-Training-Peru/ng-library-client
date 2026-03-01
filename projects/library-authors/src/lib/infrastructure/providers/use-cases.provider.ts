import { Provider } from '@angular/core';
import {
  GetAllAuthorsUseCase,
  GetAuthorByIdUseCase,
  ExistsAuthorUseCase,
  CheckAuthorNameUniquenessUseCase,
  CreateAuthorUseCase,
  UpsertAuthorUseCase,
  DeleteAuthorUseCase,
  UpdatePartialAuthorUseCase,
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
} from '../../application/use-cases';

export function provideUseCases(): Provider[] {
  return [
    // Author queries
    GetAllAuthorsUseCase,
    GetAuthorByIdUseCase,
    ExistsAuthorUseCase,
    CheckAuthorNameUniquenessUseCase,
    // Author commands
    CreateAuthorUseCase,
    UpsertAuthorUseCase,
    DeleteAuthorUseCase,
    UpdatePartialAuthorUseCase,
    // Paper
    GetAllPapersOfAuthorUseCase,
    GetPaperOfAuthorByPaperIdUseCase,
    ExistsPaperOfAuthorUseCase,
    CheckPaperTitleUniquenessOfAuthorUseCase,
    // Award
    GetAllAwardsOfAuthorUseCase,
    GetAwardOfAuthorByAwardIdUseCase,
    ExistsAwardOfAuthorUseCase,
    CheckAwardTitleUniquenessOfAuthorUseCase,
    // Affiliation
    GetAllAffiliationsOfAuthorUseCase,
    GetAffiliationOfAuthorByAffiliationIdUseCase,
    ExistsAffiliationOfAuthorUseCase,
    CheckAffiliationNameUniquenessOfAuthorUseCase,
  ];
}

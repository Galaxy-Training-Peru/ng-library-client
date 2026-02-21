import { Provider } from '@angular/core';
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
} from '../../application/use-cases';

export function provideUseCases(): Provider[] {
  return [
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
  ];
}

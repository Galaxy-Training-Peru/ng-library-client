import { Provider } from '@angular/core';
import {
  GetAllLiteraryGenresUseCase,
  GetLiteraryGenreByIdUseCase,
  ExistsLiteraryGenreUseCase,
  CheckLiteraryGenreNameUniquenessUseCase,
  GetAllPublishersUseCase,
  GetPublisherByIdUseCase,
  ExistsPublisherUseCase,
  CheckPublisherNameUniquenessUseCase,
} from '../../application/use-cases';

export function provideUseCases(): Provider[] {
  return [
    GetAllLiteraryGenresUseCase,
    GetLiteraryGenreByIdUseCase,
    ExistsLiteraryGenreUseCase,
    CheckLiteraryGenreNameUniquenessUseCase,
    GetAllPublishersUseCase,
    GetPublisherByIdUseCase,
    ExistsPublisherUseCase,
    CheckPublisherNameUniquenessUseCase,
  ];
}

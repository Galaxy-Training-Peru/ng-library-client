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
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function provideUseCases(): Provider[] {
  const useCases = [
    GetAllLiteraryGenresUseCase,
    GetLiteraryGenreByIdUseCase,
    ExistsLiteraryGenreUseCase,
    CheckLiteraryGenreNameUniquenessUseCase,
    GetAllPublishersUseCase,
    GetPublisherByIdUseCase,
    ExistsPublisherUseCase,
    CheckPublisherNameUniquenessUseCase,
  ];

  return useCases.flatMap((useCase) =>
    provideTracedClass(useCase, 'application.use-case.catalog'),
  );
}

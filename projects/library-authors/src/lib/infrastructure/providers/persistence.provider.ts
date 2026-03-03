import { Provider } from '@angular/core';
import {
  AUTHOR_QUERY_SERVICE,
  PAPER_QUERY_SERVICE,
  AWARD_QUERY_SERVICE,
  AFFILIATION_QUERY_SERVICE,
  AUTHOR_REPOSITORY,
} from '../../application/contracts';
import {
  AuthorQueryServiceImpl,
  PaperQueryServiceImpl,
  AwardQueryServiceImpl,
  AffiliationQueryServiceImpl,
} from '../persistence/queries';
import { AuthorRepositoryImpl } from '../persistence/repositories';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function providePersistence(): Provider[] {
  return [
    ...provideTracedClass(AuthorQueryServiceImpl, 'infrastructure.query-service.author'),
    ...provideTracedClass(PaperQueryServiceImpl, 'infrastructure.query-service.paper'),
    ...provideTracedClass(AwardQueryServiceImpl, 'infrastructure.query-service.award'),
    ...provideTracedClass(AffiliationQueryServiceImpl, 'infrastructure.query-service.affiliation'),
    ...provideTracedClass(AuthorRepositoryImpl, 'infrastructure.repository.author'),
    {
      provide: AUTHOR_QUERY_SERVICE,
      useExisting: AuthorQueryServiceImpl,
    },
    {
      provide: PAPER_QUERY_SERVICE,
      useExisting: PaperQueryServiceImpl,
    },
    {
      provide: AWARD_QUERY_SERVICE,
      useExisting: AwardQueryServiceImpl,
    },
    {
      provide: AFFILIATION_QUERY_SERVICE,
      useExisting: AffiliationQueryServiceImpl,
    },
    {
      provide: AUTHOR_REPOSITORY,
      useExisting: AuthorRepositoryImpl,
    },
  ];
}

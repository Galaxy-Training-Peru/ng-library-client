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

export function providePersistence(): Provider[] {
  return [
    { provide: AUTHOR_QUERY_SERVICE, useClass: AuthorQueryServiceImpl },
    { provide: PAPER_QUERY_SERVICE, useClass: PaperQueryServiceImpl },
    { provide: AWARD_QUERY_SERVICE, useClass: AwardQueryServiceImpl },
    { provide: AFFILIATION_QUERY_SERVICE, useClass: AffiliationQueryServiceImpl },
    { provide: AUTHOR_REPOSITORY, useClass: AuthorRepositoryImpl },
  ];
}

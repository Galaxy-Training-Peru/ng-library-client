import { Provider } from '@angular/core';
import {
  AUTHOR_QUERY_SERVICE,
  PAPER_QUERY_SERVICE,
  AWARD_QUERY_SERVICE,
  AFFILIATION_QUERY_SERVICE,
} from '../../application/contracts';
import { AuthorQueryServiceImpl } from '../persistence/query-services';
import { PaperQueryServiceImpl } from '../persistence/query-services';
import { AwardQueryServiceImpl } from '../persistence/query-services';
import { AffiliationQueryServiceImpl } from '../persistence/query-services';

export function providePersistence(): Provider[] {
  return [
    { provide: AUTHOR_QUERY_SERVICE, useClass: AuthorQueryServiceImpl },
    { provide: PAPER_QUERY_SERVICE, useClass: PaperQueryServiceImpl },
    { provide: AWARD_QUERY_SERVICE, useClass: AwardQueryServiceImpl },
    { provide: AFFILIATION_QUERY_SERVICE, useClass: AffiliationQueryServiceImpl },
  ];
}

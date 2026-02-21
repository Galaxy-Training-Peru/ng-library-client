import { Provider } from '@angular/core';
import { LITERARY_GENRE_QUERY_SERVICE, PUBLISHER_QUERY_SERVICE } from '../../application/contracts/persistence/queries';
import { LiteraryGenreQueryServiceImpl, PublisherQueryServiceImpl } from '../persistence/query-services';

export function providePersistence(): Provider[] {
  return [
    { provide: LITERARY_GENRE_QUERY_SERVICE, useClass: LiteraryGenreQueryServiceImpl },
    { provide: PUBLISHER_QUERY_SERVICE, useClass: PublisherQueryServiceImpl },
  ];
}

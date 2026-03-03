import { Provider } from '@angular/core';
import { LITERARY_GENRE_QUERY_SERVICE, PUBLISHER_QUERY_SERVICE } from '../../application/contracts/persistence/queries';
import { LiteraryGenreQueryServiceImpl, PublisherQueryServiceImpl } from '../persistence/queries';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function providePersistence(): Provider[] {
  return [
    ...provideTracedClass(LiteraryGenreQueryServiceImpl, 'infrastructure.query-service.literary-genre'),
    ...provideTracedClass(PublisherQueryServiceImpl, 'infrastructure.query-service.publisher'),
    {
      provide: LITERARY_GENRE_QUERY_SERVICE,
      useExisting: LiteraryGenreQueryServiceImpl,
    },
    {
      provide: PUBLISHER_QUERY_SERVICE,
      useExisting: PublisherQueryServiceImpl,
    },
  ];
}

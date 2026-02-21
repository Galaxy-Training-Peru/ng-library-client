import { Provider } from '@angular/core';
import { providePersistence } from './persistence.provider';

export function provideInfrastructure(): Provider[] {
  return [
    ...providePersistence(),
  ];
}

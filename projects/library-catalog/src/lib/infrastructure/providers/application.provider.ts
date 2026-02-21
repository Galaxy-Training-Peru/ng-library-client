import { Provider } from '@angular/core';
import { providePublicApi } from './public-api.provider';
import { provideUseCases } from './use-cases.provider';

export function provideApplication(): Provider[] {
  return [
    ...provideUseCases(),
    ...providePublicApi(),
  ];
}

import { Provider } from '@angular/core';
import { provideComputators } from './computators.provider';
import { provideValidators }  from './validators.provider';
import { provideUseCases }    from './use-cases.provider';
import { providePublicApi }   from './public-api.provider';

export function provideApplication(): Provider[] {
  return [
    ...provideComputators(),
    ...provideValidators(),
    ...provideUseCases(),
    ...providePublicApi(),
  ];
}

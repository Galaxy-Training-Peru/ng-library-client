import { Provider } from '@angular/core';
import {
  ValidateFullNameValidator,
  ValidateLifeSpanValidator,
} from '../../application/validators/author';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function provideValidators(): Provider[] {
  const validators = [
    // Author
    ValidateFullNameValidator,
    ValidateLifeSpanValidator,
  ];

  return validators.flatMap((validator) =>
    provideTracedClass(validator, 'application.validator.authors'),
  );
}

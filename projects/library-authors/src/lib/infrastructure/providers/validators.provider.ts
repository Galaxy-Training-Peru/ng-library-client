import { Provider } from '@angular/core';
import {
  ValidateFullNameValidator,
  ValidateLifeSpanValidator,
} from '../../application/validators/author';

export function provideValidators(): Provider[] {
  return [
    // Author
    ValidateFullNameValidator,
    ValidateLifeSpanValidator,
  ];
}

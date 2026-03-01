import { Provider } from '@angular/core';
import {
  BuildFullNameComputator,
  CalculateAgeComputator,
  IsDeceasedComputator,
} from '../../application/computators/author';

export function provideComputators(): Provider[] {
  return [
    // Author
    BuildFullNameComputator,
    CalculateAgeComputator,
    IsDeceasedComputator,
  ];
}

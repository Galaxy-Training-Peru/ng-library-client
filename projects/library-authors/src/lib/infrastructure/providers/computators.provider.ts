import { Provider } from '@angular/core';
import {
  BuildFullNameComputator,
  CalculateAgeComputator,
  IsDeceasedComputator,
} from '../../application/computators/author';
import { provideTracedClass } from '@eac-arch/infrastructure-telemetry';

export function provideComputators(): Provider[] {
  const computators = [
    // Author
    BuildFullNameComputator,
    CalculateAgeComputator,
    IsDeceasedComputator,
  ];

  return computators.flatMap((computator) =>
    provideTracedClass(computator, 'application.computator.authors'),
  );
}

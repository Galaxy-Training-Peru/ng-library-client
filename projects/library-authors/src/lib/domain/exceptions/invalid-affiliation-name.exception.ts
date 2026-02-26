import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when AffiliationName invariants are violated.
export class InvalidAffiliationNameException extends ValidationException {
  static readonly code = 'INVALID_AFFILIATION_NAME';

  private constructor(errors: ExceptionError[]) {
    super(errors);
  }

  static validate(value: string): void {
    const errors: ExceptionError[] = [];

    if (!value?.trim()) {
      errors.push({ field: 'name', value, message: 'Affiliation name is required.' });
    }

    if (errors.length) throw new InvalidAffiliationNameException(errors);
  }
}

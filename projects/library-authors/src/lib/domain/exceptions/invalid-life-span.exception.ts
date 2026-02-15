import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when LifeSpan invariants are violated.
export class InvalidLifeSpanException extends ValidationException {
  static readonly code = 'INVALID_LIFE_SPAN';

  private constructor(errors: ExceptionError[]) {
    super(errors);
  }

  static validate(dateOfBirth: Date, dateOfDeath?: Date | null): void {
    const errors: ExceptionError[] = [];

    if (!dateOfBirth || Number.isNaN(dateOfBirth.getTime())) {
      errors.push({ field: 'dateOfBirth', value: dateOfBirth, message: 'Date of birth is required and must be valid.' });
    }

    if (dateOfDeath != null && Number.isNaN(dateOfDeath.getTime())) {
      errors.push({ field: 'dateOfDeath', value: dateOfDeath, message: 'Date of death must be a valid date.' });
    }

    if (dateOfBirth && dateOfDeath && dateOfDeath < dateOfBirth) {
      errors.push({ field: 'dateOfBirth', value: dateOfBirth, message: 'Date of birth cannot be later than date of death.' });
      errors.push({ field: 'dateOfDeath', value: dateOfDeath, message: 'Date of death cannot be earlier than date of birth.' });
    }

    if (errors.length) throw new InvalidLifeSpanException(errors);
  }
}

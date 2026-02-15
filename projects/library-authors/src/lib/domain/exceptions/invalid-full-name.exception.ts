import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when FullName invariants are violated.
// Collects per-field errors so callers can display them individually.
export class InvalidFullNameException extends ValidationException {
  static readonly code = 'INVALID_FULL_NAME';

  private constructor(errors: ExceptionError[]) {
    super(errors);
  }

  static validate(firstName: string, lastName: string): void {
    const errors: ExceptionError[] = [];

    if (!firstName?.trim()) {
      errors.push({ field: 'firstName', value: firstName, message: 'First name is required.' });
    }
    if (!lastName?.trim()) {
      errors.push({ field: 'lastName', value: lastName, message: 'Last name is required.' });
    }

    if (errors.length) throw new InvalidFullNameException(errors);
  }
}

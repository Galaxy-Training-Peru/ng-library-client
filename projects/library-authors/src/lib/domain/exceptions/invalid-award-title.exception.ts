import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when AwardTitle invariants are violated.
export class InvalidAwardTitleException extends ValidationException {
  static readonly code = 'INVALID_AWARD_TITLE';

  private constructor(errors: ExceptionError[]) {
    super(errors);
  }

  static validate(value: string): void {
    const errors: ExceptionError[] = [];

    if (!value?.trim()) {
      errors.push({ field: 'title', value, message: 'Award title is required.' });
    } else if (value.length > 200) {
      errors.push({ field: 'title', value, message: 'Award title cannot exceed 200 characters.' });
    }

    if (errors.length) throw new InvalidAwardTitleException(errors);
  }
}

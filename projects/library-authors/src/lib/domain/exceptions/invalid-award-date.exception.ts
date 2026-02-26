import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when an award date falls outside the author's life span.
export class InvalidAwardDateException extends ValidationException {
  static readonly code = 'INVALID_AWARD_DATE';

  constructor(awardedOn: Date, dateOfBirth: Date, dateOfDeath: Date | null) {
    const errors: ExceptionError[] = [
      {
        field: 'awardedOn',
        value: awardedOn,
        message: dateOfDeath
          ? `Award date must be between ${dateOfBirth.toDateString()} and ${dateOfDeath.toDateString()}.`
          : `Award date cannot be before the author's birth (${dateOfBirth.toDateString()}).`,
      },
    ];
    super(errors);
  }
}

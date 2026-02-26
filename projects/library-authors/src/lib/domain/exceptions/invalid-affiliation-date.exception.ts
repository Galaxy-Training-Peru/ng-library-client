import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when an affiliation period falls outside the author's life span.
export class InvalidAffiliationDateException extends ValidationException {
  static readonly code = 'INVALID_AFFILIATION_DATE';

  constructor(errors: ExceptionError[]) {
    super(errors);
  }

  static forStartDate(start: Date, dateOfBirth: Date, dateOfDeath: Date | null): InvalidAffiliationDateException {
    return new InvalidAffiliationDateException([
      {
        field: 'startDate',
        value: start,
        message: dateOfDeath
          ? `Start date must be between ${dateOfBirth.toDateString()} and ${dateOfDeath.toDateString()}.`
          : `Start date cannot be before the author's birth (${dateOfBirth.toDateString()}).`,
      },
    ]);
  }

  static forEndDate(end: Date, dateOfBirth: Date, dateOfDeath: Date | null): InvalidAffiliationDateException {
    return new InvalidAffiliationDateException([
      {
        field: 'endDate',
        value: end,
        message: dateOfDeath
          ? `End date must be between ${dateOfBirth.toDateString()} and ${dateOfDeath.toDateString()}.`
          : `End date cannot be before the author's birth (${dateOfBirth.toDateString()}).`,
      },
    ]);
  }
}

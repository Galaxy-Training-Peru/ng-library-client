import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when AffiliationPeriod invariants are violated.
export class InvalidAffiliationPeriodException extends ValidationException {
  static readonly code = 'INVALID_AFFILIATION_PERIOD';

  private constructor(errors: ExceptionError[]) {
    super(errors);
  }

  static validate(startDate: Date, endDate?: Date | null): void {
    const errors: ExceptionError[] = [];

    if (!startDate) {
      errors.push({ field: 'startDate', value: startDate, message: 'Start date is required.' });
    }

    if (endDate && startDate && endDate < startDate) {
      errors.push({ field: 'endDate', value: endDate, message: 'End date cannot be earlier than start date.' });
    }

    if (errors.length) throw new InvalidAffiliationPeriodException(errors);
  }
}

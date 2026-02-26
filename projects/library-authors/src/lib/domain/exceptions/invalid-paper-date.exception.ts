import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when a paper's publication date falls outside the author's life span.
export class InvalidPaperDateException extends ValidationException {
  static readonly code = 'INVALID_PAPER_DATE';

  constructor(publishedOn: Date, dateOfBirth: Date, dateOfDeath: Date | null) {
    const errors: ExceptionError[] = [
      {
        field: 'publishedOn',
        value: publishedOn,
        message: dateOfDeath
          ? `Publication date must be between ${dateOfBirth.toDateString()} and ${dateOfDeath.toDateString()}.`
          : `Publication date cannot be before the author's birth (${dateOfBirth.toDateString()}).`,
      },
    ];
    super(errors);
  }
}

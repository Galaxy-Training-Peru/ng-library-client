import { ValidationException } from '@eac-arch/shared-kernel';
import type { ExceptionError } from '@eac-arch/shared-kernel';

// Thrown when LiteraryGenreRef invariants are violated.
export class InvalidLiteraryGenreException extends ValidationException {
  static readonly code = 'INVALID_LITERARY_GENRE';

  private constructor(errors: ExceptionError[]) {
    super(errors);
  }

  static validate(id: string, name: string): void {
    const errors: ExceptionError[] = [];

    if (!id?.trim()) {
      errors.push({ field: 'literaryGenreId', value: id, message: 'Literary genre id is required.' });
    }
    if (!name?.trim()) {
      errors.push({ field: 'literaryGenreName', value: name, message: 'Literary genre name is required.' });
    }

    if (errors.length) throw new InvalidLiteraryGenreException(errors);
  }
}

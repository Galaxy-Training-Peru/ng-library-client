import { ConflictException } from '@eac-arch/shared-kernel';

// Thrown when an award title already exists within the same author's awards.
export class DuplicateAwardTitleException extends ConflictException {
  static readonly code = 'DUPLICATE_AWARD_TITLE';

  constructor(title: string) {
    super(`An award titled '${title}' already exists for this author.`);
  }
}

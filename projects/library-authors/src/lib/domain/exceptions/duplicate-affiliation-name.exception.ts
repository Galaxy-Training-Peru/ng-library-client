import { ConflictException } from '@eac-arch/shared-kernel';

// Thrown when an affiliation name already exists within the same author's affiliations.
export class DuplicateAffiliationNameException extends ConflictException {
  static readonly code = 'DUPLICATE_AFFILIATION_NAME';

  constructor(name: string) {
    super(`An affiliation named '${name}' already exists for this author.`);
  }
}

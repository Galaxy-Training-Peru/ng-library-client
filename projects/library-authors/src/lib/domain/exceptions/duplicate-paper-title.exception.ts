import { ConflictException } from '@eac-arch/shared-kernel';

// Thrown when a paper title already exists within the same author's papers.
export class DuplicatePaperTitleException extends ConflictException {
  static readonly code = 'DUPLICATE_PAPER_TITLE';

  constructor(title: string) {
    super(`A paper titled '${title}' already exists for this author.`);
  }
}

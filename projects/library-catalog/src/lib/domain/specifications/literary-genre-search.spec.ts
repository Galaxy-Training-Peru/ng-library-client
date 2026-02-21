import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { LiteraryGenreModel } from '../../application/models';

export class LiteraryGenreSearchSpec extends QuerySpecification<LiteraryGenreModel> {
  constructor(private readonly term?: string) {
    super();
  }

  isSatisfiedBy(candidate: LiteraryGenreModel): boolean {
    if (!this.term?.trim()) return true;
    const search = this.term.trim().toLowerCase();

    return (
      candidate.name.toLowerCase().includes(search) ||
      (candidate.description?.toLowerCase().includes(search) ?? false)
    );
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.term?.trim()) params['search'] = this.term.trim();
    return params;
  }
}

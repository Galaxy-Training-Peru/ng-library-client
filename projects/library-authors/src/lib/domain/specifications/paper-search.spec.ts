import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { PaperModel } from '../../application/models';

export class PaperSearchSpec extends QuerySpecification<PaperModel> {
  constructor(private readonly term?: string) {
    super();
  }

  isSatisfiedBy(candidate: PaperModel): boolean {
    if (!this.term?.trim()) return true;
    const search = this.term.trim().toLowerCase();
    return candidate.title.toLowerCase().includes(search);
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.term?.trim()) params['search'] = this.term.trim();
    return params;
  }
}

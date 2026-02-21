import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AwardModel } from '../../application/models';

export class AwardSearchSpec extends QuerySpecification<AwardModel> {
  constructor(private readonly term?: string) {
    super();
  }

  isSatisfiedBy(candidate: AwardModel): boolean {
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

import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AwardModel } from '../../application/models';

export class AwardByTitleSpec extends QuerySpecification<AwardModel> {
  constructor(private readonly title?: string) {
    super();
  }

  isSatisfiedBy(candidate: AwardModel): boolean {
    if (!this.title?.trim()) return true;
    return candidate.title.toLowerCase() === this.title.trim().toLowerCase();
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.title?.trim()) params['title'] = this.title.trim();
    return params;
  }
}

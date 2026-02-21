import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { PaperModel } from '../../application/models';

export class PaperByTitleSpec extends QuerySpecification<PaperModel> {
  constructor(private readonly title?: string) {
    super();
  }

  isSatisfiedBy(candidate: PaperModel): boolean {
    if (!this.title?.trim()) return true;
    return candidate.title.toLowerCase() === this.title.trim().toLowerCase();
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.title?.trim()) params['title'] = this.title.trim();
    return params;
  }
}

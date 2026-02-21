import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { PaperModel } from '../../application/models';

export class PaperByYearSpec extends QuerySpecification<PaperModel> {
  constructor(private readonly publishedYear?: number) {
    super();
  }

  isSatisfiedBy(candidate: PaperModel): boolean {
    if (!this.publishedYear) return true;
    return new Date(candidate.publishedOn).getFullYear() === this.publishedYear;
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.publishedYear) params['publishedYear'] = String(this.publishedYear);
    return params;
  }
}

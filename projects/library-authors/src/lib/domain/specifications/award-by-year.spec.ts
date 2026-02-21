import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AwardModel } from '../../application/models';

export class AwardByYearSpec extends QuerySpecification<AwardModel> {
  constructor(private readonly awardedYear?: number) {
    super();
  }

  isSatisfiedBy(candidate: AwardModel): boolean {
    if (!this.awardedYear) return true;
    return new Date(candidate.awardedOn).getFullYear() === this.awardedYear;
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.awardedYear) params['awardedYear'] = String(this.awardedYear);
    return params;
  }
}

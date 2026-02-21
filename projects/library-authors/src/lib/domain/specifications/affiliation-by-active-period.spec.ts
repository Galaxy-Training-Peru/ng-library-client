import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AffiliationModel } from '../../application/models';

export class AffiliationByActivePeriodSpec extends QuerySpecification<AffiliationModel> {
  constructor(private readonly activeOn?: string) {
    super();
  }

  isSatisfiedBy(candidate: AffiliationModel): boolean {
    if (!this.activeOn) return true;
    const date = new Date(this.activeOn);
    const start = new Date(candidate.startDate);

    if (start > date) return false;
    if (candidate.endDate) {
      const end = new Date(candidate.endDate);
      if (end < date) return false;
    }
    return true;
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.activeOn?.trim()) params['activeOn'] = this.activeOn.trim();
    return params;
  }
}

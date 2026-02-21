import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AffiliationModel } from '../../application/models';

export class AffiliationByNameSpec extends QuerySpecification<AffiliationModel> {
  constructor(private readonly institutionName?: string) {
    super();
  }

  isSatisfiedBy(candidate: AffiliationModel): boolean {
    if (!this.institutionName?.trim()) return true;
    return candidate.institutionName.toLowerCase() === this.institutionName.trim().toLowerCase();
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.institutionName?.trim()) params['institutionName'] = this.institutionName.trim();
    return params;
  }
}

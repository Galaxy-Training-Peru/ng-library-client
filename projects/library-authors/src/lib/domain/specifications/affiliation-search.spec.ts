import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AffiliationModel } from '../../application/models';

export class AffiliationSearchSpec extends QuerySpecification<AffiliationModel> {
  constructor(private readonly term?: string) {
    super();
  }

  isSatisfiedBy(candidate: AffiliationModel): boolean {
    if (!this.term?.trim()) return true;
    const search = this.term.trim().toLowerCase();
    return candidate.institutionName.toLowerCase().includes(search);
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.term?.trim()) params['search'] = this.term.trim();
    return params;
  }
}

import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { PublisherModel } from '../../application/models';

export class PublisherSearchSpec extends QuerySpecification<PublisherModel> {
  constructor(private readonly term?: string) {
    super();
  }

  isSatisfiedBy(candidate: PublisherModel): boolean {
    if (!this.term?.trim()) return true;
    const search = this.term.trim().toLowerCase();

    return (
      candidate.name.toLowerCase().includes(search) ||
      (candidate.country?.toLowerCase().includes(search) ?? false) ||
      (candidate.website?.toLowerCase().includes(search) ?? false)
    );
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.term?.trim()) params['search'] = this.term.trim();
    return params;
  }
}

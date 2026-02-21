import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AuthorModel } from '../../application/models';

export class AuthorByNameSpec extends QuerySpecification<AuthorModel> {
  constructor(
    private readonly firstName?: string,
    private readonly lastName?: string,
  ) {
    super();
  }

  isSatisfiedBy(candidate: AuthorModel): boolean {
    if (this.firstName && candidate.firstName.toLowerCase() !== this.firstName.trim().toLowerCase()) {
      return false;
    }
    if (this.lastName && candidate.lastName.toLowerCase() !== this.lastName.trim().toLowerCase()) {
      return false;
    }
    return true;
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.firstName?.trim()) params['firstName'] = this.firstName.trim();
    if (this.lastName?.trim()) params['lastName'] = this.lastName.trim();
    return params;
  }
}

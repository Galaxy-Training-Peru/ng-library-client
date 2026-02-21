import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AuthorModel } from '../../application/models';

export class AuthorSearchSpec extends QuerySpecification<AuthorModel> {
  constructor(private readonly term?: string) {
    super();
  }

  isSatisfiedBy(candidate: AuthorModel): boolean {
    if (!this.term?.trim()) return true;
    const search = this.term.trim().toLowerCase();

    return (
      candidate.firstName.toLowerCase().includes(search) ||
      candidate.lastName.toLowerCase().includes(search) ||
      candidate.literaryGenreName.toLowerCase().includes(search)
    );
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.term?.trim()) params['search'] = this.term.trim();
    return params;
  }
}

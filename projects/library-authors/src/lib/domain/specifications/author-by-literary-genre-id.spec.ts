import { QuerySpecification } from '@eac-arch/shared-kernel';
import type { AuthorModel } from '../../application/models';

export class AuthorByLiteraryGenreIdSpec extends QuerySpecification<AuthorModel> {
  constructor(private readonly literaryGenreId?: string) {
    super();
  }

  isSatisfiedBy(candidate: AuthorModel): boolean {
    if (!this.literaryGenreId) return true;
    return candidate.literaryGenreId === this.literaryGenreId;
  }

  toQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.literaryGenreId?.trim()) params['literaryGenreId'] = this.literaryGenreId.trim();
    return params;
  }
}

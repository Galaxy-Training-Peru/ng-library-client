import type { SortField } from '@eac-arch/shared-kernel';

export interface GetAllPapersOfAuthorRequest {
  readonly authorId: string;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly title?: string;
  readonly publishedYear?: number;
  readonly search?: string;
  readonly sortFields?: SortField[];
  readonly fields?: string[];
}

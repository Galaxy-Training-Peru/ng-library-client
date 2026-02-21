// Mirrors the server PaginationMetadata in the response body metadata.pagination.
export interface PaginationMeta {
  readonly currentPage: number;
  readonly pageSize: number;
  readonly totalCount: number;
  readonly totalPages: number;
  readonly hasPrevious: boolean;
  readonly hasNext: boolean;
}

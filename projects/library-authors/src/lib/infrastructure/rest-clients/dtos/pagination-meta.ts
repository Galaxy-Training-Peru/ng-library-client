// Mirrors the server PaginationMetadata serialized in the X-Pagination header.
export interface PaginationMeta {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly pageSize: number;
  readonly totalCount: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}

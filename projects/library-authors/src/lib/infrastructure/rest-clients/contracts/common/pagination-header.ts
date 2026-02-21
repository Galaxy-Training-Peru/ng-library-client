import type { PaginationMeta } from './pagination-meta';

// Mirrors the server X-Pagination header shape (extends PaginationMeta with page links).
export interface PaginationHeader extends PaginationMeta {
  readonly previousPageLink: string | null;
  readonly nextPageLink: string | null;
}

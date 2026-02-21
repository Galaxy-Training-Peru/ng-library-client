import type { PaginationMeta } from './pagination-meta';

// Mirrors the server ResponseMetadata wrapper inside every response body.
export interface ResponseMetadata {
  readonly pagination: PaginationMeta;
  readonly operation: string | null;
}

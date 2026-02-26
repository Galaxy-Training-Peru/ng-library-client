import type { JsonPatchOperation } from '@eac-arch/infrastructure-http';

export interface UpdatePartialPaperOfAuthorHttpRequest {
  readonly authorId: string;
  readonly paperId: string;
  readonly operations: readonly JsonPatchOperation[];
}

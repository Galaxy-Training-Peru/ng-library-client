import type { JsonPatchOperation } from '@eac-arch/infrastructure-http';

export interface UpdatePartialAwardOfAuthorHttpRequest {
  readonly authorId: string;
  readonly awardId: string;
  readonly operations: readonly JsonPatchOperation[];
}

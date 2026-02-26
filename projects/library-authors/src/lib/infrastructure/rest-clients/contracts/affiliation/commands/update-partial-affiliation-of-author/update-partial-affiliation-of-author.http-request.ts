import type { JsonPatchOperation } from '@eac-arch/infrastructure-http';

export interface UpdatePartialAffiliationOfAuthorHttpRequest {
  readonly authorId: string;
  readonly affiliationId: string;
  readonly operations: readonly JsonPatchOperation[];
}

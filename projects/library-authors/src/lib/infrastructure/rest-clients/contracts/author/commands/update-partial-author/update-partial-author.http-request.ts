import type { JsonPatchOperation } from '@eac-arch/infrastructure-http';

// Body sent as JSON Patch document (application/json-patch+json).
// Each operation patches UpdatePartialAuthorHttpRequest on the server.
export interface UpdatePartialAuthorHttpRequest {
  readonly authorId: string;
  readonly operations: readonly JsonPatchOperation[];
}

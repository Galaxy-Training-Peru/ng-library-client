import type { PaperDto } from '../../../../dtos/paper.dto';

// Server returns 201 with { data: PaperDto } when created, or 204 with no body when updated.
export type UpsertPaperOfAuthorHttpResponse = PaperDto | null;

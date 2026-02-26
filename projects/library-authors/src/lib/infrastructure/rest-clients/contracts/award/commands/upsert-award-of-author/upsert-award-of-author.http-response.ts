import type { AwardDto } from '../../../../dtos/award.dto';

// Server returns 201 with { data: AwardDto } when created, or 204 with no body when updated.
export type UpsertAwardOfAuthorHttpResponse = AwardDto | null;

import type { AffiliationDto } from '../../../../dtos/affiliation.dto';

// Server returns 201 with { data: AffiliationDto } when created, or 204 with no body when updated.
export type UpsertAffiliationOfAuthorHttpResponse = AffiliationDto | null;

import type { AuthorDto } from '../../../../dtos/author.dto';

// Server returns 201 with { data: AuthorDto } when created, or 204 with no body when updated.
export type UpsertAuthorHttpResponse = AuthorDto | null;

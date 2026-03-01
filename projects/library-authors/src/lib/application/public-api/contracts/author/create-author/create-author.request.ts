export interface CreateAuthorRequest {
  readonly authorId?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string;
  readonly dateOfDeath?: string | null;
  readonly literaryGenreId: string;
}

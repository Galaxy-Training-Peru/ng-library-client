export interface CreateAuthorHttpRequest {
  readonly authorId?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string;
  readonly dateOfDeath?: string;
  readonly literaryGenreId: string;
}

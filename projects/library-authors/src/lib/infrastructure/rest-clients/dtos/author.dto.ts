// Mirrors the server Http/Dtos/AuthorDto.cs exactly.
// Only raw fields from the HTTP API - no computed properties.
export interface AuthorDto {
  readonly authorId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string;
  readonly dateOfDeath: string | null;
  readonly literaryGenreId: string;
  readonly literaryGenreName: string;
}

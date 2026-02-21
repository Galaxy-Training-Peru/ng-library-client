export interface AuthorDto {
  readonly authorId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly fullName: string;
  readonly dateOfBirth: string;
  readonly dateOfDeath: string | null;
  readonly age: number | null;
  readonly isDeceased: boolean;
  readonly literaryGenreId: string;
  readonly literaryGenreName: string;
}

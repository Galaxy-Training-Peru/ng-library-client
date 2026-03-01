// Represents the set of author fields that can be partially updated.
// Only the fields explicitly provided will be sent to the server.
// Use null for dateOfDeath to explicitly clear the value.
export interface AuthorChanges {
  readonly firstName?:       string;
  readonly lastName?:        string;
  readonly dateOfBirth?:     string;
  readonly dateOfDeath?:     string | null;
  readonly literaryGenreId?: string;
}

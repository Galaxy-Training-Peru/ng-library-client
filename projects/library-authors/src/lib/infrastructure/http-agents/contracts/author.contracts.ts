export interface AuthorQueryOptions {
  sort?: string;
  search?: string;
  firstName?: string;
  lastName?: string;
  literaryGenreId?: string;
  fields?: string;
}

export interface CreateAuthorData {
  authorId?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  literaryGenreId: string;
}

export interface UpsertAuthorData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  dateOfDeath?: string;
  literaryGenreId: string;
}

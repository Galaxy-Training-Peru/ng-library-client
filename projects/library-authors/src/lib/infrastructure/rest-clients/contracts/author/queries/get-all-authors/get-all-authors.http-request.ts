export interface GetAllAuthorsHttpRequest {
  readonly pageNumber?: number;
  readonly pageSize?: number;
  readonly sort?: string;
  readonly search?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly literaryGenreId?: string;
  readonly fields?: string;
}

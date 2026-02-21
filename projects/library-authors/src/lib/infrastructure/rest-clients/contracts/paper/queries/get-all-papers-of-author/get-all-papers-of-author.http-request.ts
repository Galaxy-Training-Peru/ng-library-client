export interface GetAllPapersOfAuthorHttpRequest {
  readonly authorId: string;
  readonly pageNumber?: number;
  readonly pageSize?: number;
  readonly sort?: string;
  readonly search?: string;
  readonly title?: string;
  readonly publishedYear?: number;
  readonly fields?: string;
}

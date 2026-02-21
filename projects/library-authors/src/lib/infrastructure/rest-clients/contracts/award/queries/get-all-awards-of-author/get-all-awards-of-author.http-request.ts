export interface GetAllAwardsOfAuthorHttpRequest {
  readonly authorId: string;
  readonly pageNumber?: number;
  readonly pageSize?: number;
  readonly sort?: string;
  readonly search?: string;
  readonly title?: string;
  readonly awardedYear?: number;
  readonly fields?: string;
}

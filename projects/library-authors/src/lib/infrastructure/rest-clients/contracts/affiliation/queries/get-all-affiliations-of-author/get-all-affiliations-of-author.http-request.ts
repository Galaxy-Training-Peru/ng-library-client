export interface GetAllAffiliationsOfAuthorHttpRequest {
  readonly authorId: string;
  readonly pageNumber?: number;
  readonly pageSize?: number;
  readonly sort?: string;
  readonly search?: string;
  readonly institutionName?: string;
  readonly activeOn?: string;
  readonly fields?: string;
}

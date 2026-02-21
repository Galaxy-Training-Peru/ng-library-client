export interface GetAllPublishersHttpRequest {
  readonly pageNumber?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly sort?: string;
  readonly fields?: string;
}

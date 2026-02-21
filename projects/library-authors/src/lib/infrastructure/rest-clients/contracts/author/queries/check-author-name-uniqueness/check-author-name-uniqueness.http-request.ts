export interface CheckAuthorNameUniquenessHttpRequest {
  readonly firstName: string;
  readonly lastName: string;
  readonly excludeAuthorId?: string;
}

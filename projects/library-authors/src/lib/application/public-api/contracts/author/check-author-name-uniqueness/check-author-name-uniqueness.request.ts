export interface CheckAuthorNameUniquenessRequest {
  readonly firstName: string;
  readonly lastName: string;
  readonly excludeAuthorId?: string;
}

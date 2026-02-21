export interface CheckAuthorNameUniquenessHttpResponse {
  readonly data: CheckAuthorNameUniquenessHttpData;
}

export interface CheckAuthorNameUniquenessHttpData {
  readonly firstName: string;
  readonly lastName: string;
  readonly isUnique: boolean;
}

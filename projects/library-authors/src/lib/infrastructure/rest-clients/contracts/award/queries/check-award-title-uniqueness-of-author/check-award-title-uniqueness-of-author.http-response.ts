export interface CheckAwardTitleUniquenessOfAuthorHttpResponse {
  readonly data: CheckAwardTitleUniquenessOfAuthorHttpData;
}

export interface CheckAwardTitleUniquenessOfAuthorHttpData {
  readonly title: string;
  readonly isUnique: boolean;
}
